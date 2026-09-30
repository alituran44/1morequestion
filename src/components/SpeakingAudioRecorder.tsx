"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Mic, 
  Square, 
  RotateCcw, 
  Play, 
  Pause, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Volume2, 
  Sparkles,
  HelpCircle,
  FileAudio
} from "lucide-react";

export interface AudioRecordedData {
  blob: Blob | null;
  url: string;
  durationSec: number;
  fileName?: string;
}

interface SpeakingAudioRecorderProps {
  questionNumber: number;
  promptTitle: string;
  preparationSec?: number; // Örn: 60 saniye hazırlık
  maxRecordingSec?: number; // Örn: 120 saniye konuşma
  existingAudioUrl?: string | null;
  onAudioSaved: (data: AudioRecordedData) => void;
  onAudioDeleted?: () => void;
}

export function SpeakingAudioRecorder({
  questionNumber,
  promptTitle,
  preparationSec = 45,
  maxRecordingSec = 120,
  existingAudioUrl = null,
  onAudioSaved,
  onAudioDeleted,
}: SpeakingAudioRecorderProps) {
  // Phase: 'PREP' | 'READY' | 'RECORDING' | 'REVIEW'
  const [phase, setPhase] = useState<"PREP" | "READY" | "RECORDING" | "REVIEW">(
    existingAudioUrl ? "REVIEW" : preparationSec > 0 ? "PREP" : "READY"
  );

  const [prepTimeLeft, setPrepTimeLeft] = useState(preparationSec);
  const [recordTimeLeft, setRecordTimeLeft] = useState(maxRecordingSec);
  const [recordDuration, setRecordDuration] = useState(0);

  const [audioUrl, setAudioUrl] = useState<string | null>(existingAudioUrl);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [micVolume, setMicVolume] = useState<number>(0);

  // 1. Preparation countdown
  useEffect(() => {
    if (phase !== "PREP") return;

    if (prepTimeLeft <= 0) {
      setPhase("READY");
      return;
    }

    const timer = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase("READY");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, prepTimeLeft]);

  // 2. Recording countdown & duration
  useEffect(() => {
    if (phase !== "RECORDING") return;

    const timer = setInterval(() => {
      setRecordTimeLeft((prev) => {
        if (prev <= 1) {
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
      setRecordDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // Start live microphone recording
  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Tarayıcınız mikrofon erişimini desteklemiyor. Lütfen ses dosyası yükleme seçeneğini kullanın.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Audio volume visualizer simulation
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      microphone.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setMicVolume(Math.min(100, Math.round(average * 1.5)));
        if (mediaRecorder.state === "recording") {
          animationFrameRef.current = requestAnimationFrame(updateVolume);
        }
      };
      updateVolume();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(url);
        setPhase("REVIEW");

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        audioContext.close();

        onAudioSaved({
          blob: audioBlob,
          url,
          durationSec: maxRecordingSec - recordTimeLeft,
          fileName: `speaking_q${questionNumber}_recorded.webm`,
        });
      };

      mediaRecorder.start(250);
      setPhase("RECORDING");
      setRecordTimeLeft(maxRecordingSec);
      setRecordDuration(0);
    } catch (err: unknown) {
      console.error("Mic error:", err);
      const errObj = err as Error;
      setErrorMessage(errObj.message || "Mikrofon izni alınamadı. Lütfen tarayıcı izinlerini kontrol edin veya ses dosyası yükleyin.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  // Handle manual file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAudioBlob(file);
    setAudioUrl(url);
    setFileName(file.name);
    setPhase("REVIEW");

    onAudioSaved({
      blob: file,
      url,
      durationSec: 60,
      fileName: file.name,
    });
  };

  // Handle re-record
  const handleReRecord = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setFileName(null);
    setIsPlaying(false);
    setPhase("READY");
    setRecordTimeLeft(maxRecordingSec);
    setRecordDuration(0);
    if (onAudioDeleted) onAudioDeleted();
  };

  // Audio playback controls
  const togglePlay = () => {
    if (!audioElementRef.current) return;
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header with Speaking Badge & Audio Requirement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Soru {questionNumber} • Speaking Ses Kaydı Görevi
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                Ses Kaydı Zorunlu
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {promptTitle}
            </p>
          </div>
        </div>

        {/* Phase Pill Indicator */}
        <div>
          {phase === "PREP" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold animate-pulse">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Hazırlık Süresi: {prepTimeLeft}s</span>
            </span>
          )}
          {phase === "READY" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
              <Mic className="w-3.5 h-3.5 text-amber-600" />
              <span>Kayıt İçin Hazır</span>
            </span>
          )}
          {phase === "RECORDING" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Kaydediliyor: {formatSeconds(recordTimeLeft)}</span>
            </span>
          )}
          {phase === "REVIEW" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ses Kaydı Eklendi</span>
            </span>
          )}
        </div>
      </div>

      {/* Error Message if Mic Access Fails */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Interactive Studio Body */}
      {phase === "PREP" && (
        <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900">Hazırlık Süresi Başladı</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
              Soruyu dikkatlice okuyun ve notlarınızı alın. Geri sayım bittiğinde veya aşağıdaki butona bastığınızda kayıt başlayacaktır.
            </p>
          </div>
          <div className="text-4xl font-black text-amber-600 tracking-tight font-mono">
            00:{prepTimeLeft < 10 ? `0${prepTimeLeft}` : prepTimeLeft}
          </div>
          <button
            onClick={() => setPhase("READY")}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <span>Hazırlığı Bitir & Kayda Geç</span>
          </button>
        </div>
      )}

      {phase === "READY" && (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
            <Mic className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900">Konuşma Kaydını Başlat</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Maksimum konuşma süreniz: <strong>{formatSeconds(maxRecordingSec)}</strong>. Mikrofonunuzu kontrol edip butona basarak konuşmaya başlayın.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={startRecording}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mic className="w-4 h-4 text-slate-950" />
              <span>Mikrofonla Kaydı Başlat</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-slate-500" />
              <span>Veya Ses Dosyası Yükle (.mp3 / .wav)</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}

      {phase === "RECORDING" && (
        <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <span>Kayıt Devam Ediyor</span>
          </div>

          <div className="text-4xl font-black text-slate-900 tracking-tight font-mono">
            {formatSeconds(recordDuration)} / {formatSeconds(maxRecordingSec)}
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-12">
            {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 65, 85, 30, 75].map((height, i) => {
              const dynamicHeight = Math.max(15, Math.min(100, height * (micVolume / 40 + 0.3)));
              return (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-amber-500 transition-all duration-75"
                  style={{ height: `${dynamicHeight}%` }}
                />
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={stopRecording}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Kaydı Bitir & Sınava Ekle</span>
            </button>
          </div>
        </div>
      )}

      {phase === "REVIEW" && audioUrl && (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">
                {fileName || `Speaking Soru ${questionNumber} Ses Kaydı`}
              </span>
            </div>

            <button
              onClick={handleReRecord}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yeniden Kaydet</span>
            </button>
          </div>

          {/* Audio Player */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
            </button>

            <div className="flex-1 space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Ses Kaydı Dinle</span>
                <span>Hazır</span>
              </div>
            </div>

            <audio
              ref={audioElementRef}
              src={audioUrl}
              onTimeUpdate={() => {
                if (audioElementRef.current) {
                  const progress = (audioElementRef.current.currentTime / (audioElementRef.current.duration || 1)) * 100;
                  setAudioProgress(progress);
                }
              }}
              onEnded={() => {
                setIsPlaying(false);
                setAudioProgress(0);
              }}
              className="hidden"
            />
          </div>

          <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Bu ses kaydı sınav cevap kağıdınıza işlendi. Sınavı tamamladığınızda AI Telaffuz ve Akıcılık kriterleriyle değerlendirilecektir.</span>
          </div>
        </div>
      )}
    </div>
  );
}
