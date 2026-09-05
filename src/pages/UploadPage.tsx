import { useState } from 'react';
import { UploadCloud, Film, Play, Zap, CheckCircle, Loader, FileVideo, AlertTriangle } from 'lucide-react';
import { Panel, GoldButton } from '@/components/ui';
import { cameras, uploads as initialUploads, alerts as demoAlerts } from '@/data';
import type { UploadRecord } from '@/types';

export function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(cameras[0].name);
  const [fileName, setFileName] = useState('');
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>(initialUploads);
  const [formatWarning, setFormatWarning] = useState(false);

  const supportedExtensions = ['.mp4', '.mov', '.avi', '.webm'];

  const isSupported = (name: string) => {
    const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
    return supportedExtensions.includes(ext);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setUploaded(true);
    setAnalyzed(false);
    setFormatWarning(!isSupported(file.name));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const runAnalysis = () => {
    setProcessing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setProcessing(false);
      setAnalyzed(true);
      const newRecord: UploadRecord = {
        id: `up-${String(uploadHistory.length + 1).padStart(3, '0')}`,
        fileName: fileName || 'demo_clip.mp4',
        camera: selectedCamera,
        location: cameras.find((c) => c.name === selectedCamera)?.location || '',
        uploadTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
        status: 'analyzed',
        alertsFound: Math.floor(Math.random() * 4) + 1,
        fileSize: '38.2 MB',
      };
      setUploadHistory([newRecord, ...uploadHistory]);
    }, 3000);
  };

  const reset = () => {
    setUploaded(false);
    setAnalyzed(false);
    setProcessing(false);
    setFileName('');
    setFormatWarning(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-angel-ivory">Upload & Test</h1>
        <p className="text-sm text-angel-muted mt-1">Test recorded CCTV clips with AI analysis</p>
      </div>

      {!uploaded ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl py-20 px-6 text-center transition-all duration-300 ${
            dragging ? 'border-angel-gold bg-angel-gold/5' : 'border-angel-border hover:border-angel-gold/30'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-angel-gold/10 flex items-center justify-center mx-auto mb-6">
            <UploadCloud size={32} className="text-angel-gold" />
          </div>
          <h3 className="text-lg font-semibold text-angel-ivory mb-2">Drag and drop video here</h3>
          <p className="text-sm text-angel-muted mb-6">or click to browse files</p>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">
            <span className="inline-block px-6 py-2.5 border border-angel-border rounded-lg text-sm font-medium text-angel-ivory hover:border-angel-gold/50 hover:bg-angel-panel-hover transition-all cursor-pointer">
              Browse Files
            </span>
          </label>
          <div className="flex items-center justify-center gap-3 mt-8">
            {['MP4', 'MOV', 'AVI', 'WebM'].map((fmt) => (
              <span key={fmt} className="px-3 py-1 rounded-md bg-angel-panel border border-angel-border text-xs text-angel-muted font-medium">
                {fmt}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview */}
          <div className="lg:col-span-2 space-y-4">
            <Panel className="overflow-hidden">
              <div className="relative aspect-video bg-angel-bg flex items-center justify-center">
                <img src={cameras.find((c) => c.name === selectedCamera)?.image || cameras[0].image} alt="Preview" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-angel-gold/20 backdrop-blur flex items-center justify-center">
                    <Play size={28} className="text-angel-gold-light ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
                  <FileVideo size={14} className="text-angel-gold" />
                  <span className="text-xs text-angel-ivory truncate max-w-[200px]">{fileName}</span>
                </div>
              </div>
            </Panel>

            {formatWarning && (
              <div className="flex items-center gap-3 p-4 bg-angel-warning/10 border border-angel-warning/30 rounded-xl">
                <AlertTriangle size={18} className="text-angel-warning shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-angel-warning">Unsupported File Format</p>
                  <p className="text-xs text-angel-muted mt-0.5">
                    This file type may not be processable. Supported formats: MP4, MOV, AVI, WebM. You can still run a demo analysis, but real processing requires a supported format.
                  </p>
                </div>
                <button onClick={reset} className="text-sm text-angel-gold hover:text-angel-gold-light transition-colors whitespace-nowrap shrink-0">
                  Choose Another
                </button>
              </div>
            )}

            {/* Processing status */}
            {processing && (
              <Panel className="p-5 flex items-center gap-4">
                <Loader size={20} className="text-angel-gold animate-spin" />
                <div>
                  <p className="text-sm font-medium text-angel-ivory">Running AI Analysis...</p>
                  <p className="text-xs text-angel-muted">Scanning for persons, intrusions, crowds, falls, and fire</p>
                </div>
              </Panel>
            )}

            {analyzed && (
              <Panel className="p-5 border-angel-secure/30">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={20} className="text-angel-secure" />
                  <p className="text-sm font-medium text-angel-ivory">Analysis Complete</p>
                </div>
                <div className="space-y-2">
                  {demoAlerts.slice(0, 3).map((a) => (
                    <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-angel-bg border border-angel-border-soft">
                      <span className={`w-2 h-2 rounded-full ${a.severity === 'critical' ? 'bg-angel-critical' : a.severity === 'warning' ? 'bg-angel-warning' : 'bg-angel-gold'}`} />
                      <span className="text-sm text-angel-ivory flex-1">{a.type}</span>
                      <span className="text-xs text-angel-muted">{a.confidence}% confidence</span>
                    </div>
                  ))}
                </div>
              </Panel>
            )}
          </div>

          {/* Settings panel */}
          <div className="space-y-4">
            <Panel className="p-5 space-y-4">
              <h3 className="text-sm font-medium text-angel-ivory">Upload Details</h3>
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Select Camera</label>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full px-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-ivory focus:border-angel-gold/50 focus:outline-none transition-colors"
                >
                  {cameras.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Location</label>
                <p className="px-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-muted">
                  {cameras.find((c) => c.name === selectedCamera)?.location}
                </p>
              </div>
              <GoldButton onClick={runAnalysis} disabled={processing} className="w-full flex items-center justify-center gap-2">
                <Zap size={16} />
                {processing ? 'Analyzing...' : formatWarning ? 'Run Demo Analysis Anyway' : 'Run AI Analysis'}
              </GoldButton>
              <button onClick={reset} className="w-full text-sm text-angel-muted hover:text-angel-ivory transition-colors py-2">
                Upload Another Clip
              </button>
            </Panel>
          </div>
        </div>
      )}

      {/* Upload history */}
      <div>
        <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-4">Upload History</h3>
        <Panel className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-angel-border">
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3">File</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3 hidden md:table-cell">Camera</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3 hidden lg:table-cell">Uploaded</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3">Alerts</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-angel-border-soft">
              {uploadHistory.map((up) => (
                <tr key={up.id} className="hover:bg-angel-panel-hover transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Film size={14} className="text-angel-gold shrink-0" />
                      <span className="text-sm text-angel-ivory truncate max-w-[180px]">{up.fileName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="text-sm text-angel-muted">{up.camera}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-sm text-angel-muted">{up.uploadTime}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-angel-gold-light font-medium">{up.alertsFound}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-angel-secure" />
                      <span className="text-angel-secure capitalize">{up.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
