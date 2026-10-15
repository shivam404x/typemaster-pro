import React, { useState, useRef } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  FileImage,
  Palette,
  QrCode,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal = ({ isOpen, onClose, userStats }) => {
  const [userName, setUserName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [certTheme, setCertTheme] = useState('obsidian'); // 'obsidian' | 'ivory' | 'cyber'
  const certRef = useRef(null);

  if (!isOpen) return null;

  const wpm = userStats?.wpm || 65;
  const accuracy = userStats?.accuracy || 98;
  const certDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const certId = `TMP-${Math.floor(100000 + Math.random() * 900000)}`;

  // Determine Rank Tier
  let rankTier = 'Certified Typist';
  if (wpm >= 80) rankTier = 'Diamond Apex Master';
  else if (wpm >= 60) rankTier = 'Platinum Professional';
  else if (wpm >= 40) rankTier = 'Gold Speed Typist';

  const handleGenerate = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsGenerated(true);
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
      } catch {}
    }
  };

  // Theme styling definitions for live preview and print
  const themeStyles = {
    obsidian: {
      bg: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
      border: 'border-4 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)]',
      textTitle: 'text-white',
      textAccent: 'text-amber-400',
      textName: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300',
      statBg: 'bg-slate-950/80 border-slate-800',
      sealColor: 'border-amber-400 text-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
      divider: 'bg-gradient-to-r from-transparent via-amber-400 to-transparent',
      printBg: '#090d16',
      printText: '#ffffff',
      printAccent: '#f59e0b',
      printStatBg: '#020617',
      printBorder: '#d97706'
    },
    ivory: {
      bg: 'bg-gradient-to-b from-[#fdfbf7] via-[#f7f2e7] to-[#f4ede0]',
      border: 'border-4 border-[#92400e] shadow-[0_0_30px_rgba(146,64,14,0.15)] text-slate-900',
      textTitle: 'text-slate-900',
      textAccent: 'text-[#92400e]',
      textName: 'text-[#92400e]',
      statBg: 'bg-white/90 border-[#e2d5c0] text-slate-800',
      sealColor: 'border-[#92400e] text-[#92400e] bg-[#92400e]/10 shadow-sm',
      divider: 'bg-gradient-to-r from-transparent via-[#92400e] to-transparent',
      printBg: '#fbf7ee',
      printText: '#0f172a',
      printAccent: '#92400e',
      printStatBg: '#ffffff',
      printBorder: '#92400e'
    },
    cyber: {
      bg: 'bg-gradient-to-b from-[#090214] via-[#120429] to-[#05010d]',
      border: 'border-4 border-cyan-400/70 shadow-[0_0_35px_rgba(34,211,238,0.3)] text-white',
      textTitle: 'text-white',
      textAccent: 'text-cyan-400',
      textName: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400',
      statBg: 'bg-slate-950/80 border-cyan-500/30 text-white',
      sealColor: 'border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_#22d3ee]',
      divider: 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent',
      printBg: '#0b0217',
      printText: '#ffffff',
      printAccent: '#22d3ee',
      printStatBg: '#05010d',
      printBorder: '#06b6d4'
    }
  };

  const currentStyle = themeStyles[certTheme];

  // Dedicated Print Function that PRESERVES EXACT LUXURY COLORS
  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank', 'width=1000,height=750');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>TypeMaster Pro - Official Certificate (${userName})</title>
              <style>
                @page {
                  size: landscape;
                  margin: 8mm;
                }
                * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  background: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  padding: 10px;
                }
                .cert-card {
                  width: 100%;
                  max-width: 900px;
                  background: ${currentStyle.printBg} !important;
                  color: ${currentStyle.printText} !important;
                  border: 4px solid ${currentStyle.printBorder} !important;
                  border-radius: 20px;
                  padding: 44px 50px;
                  text-align: center;
                  position: relative;
                  box-shadow: none;
                }
                .corner {
                  position: absolute;
                  font-size: 26px;
                  color: ${currentStyle.printAccent} !important;
                }
                .tl { top: 12px; left: 16px; }
                .tr { top: 12px; right: 16px; }
                .bl { bottom: 12px; left: 16px; }
                .br { bottom: 12px; right: 16px; }
                .sub-title {
                  font-size: 11px;
                  font-weight: 800;
                  letter-spacing: 0.25em;
                  text-transform: uppercase;
                  color: ${currentStyle.printAccent} !important;
                  margin-bottom: 4px;
                }
                .cert-title {
                  font-size: 36px;
                  font-weight: 900;
                  font-family: Georgia, serif;
                  color: ${currentStyle.printText} !important;
                }
                .cert-divider {
                  width: 140px;
                  height: 2.5px;
                  background: ${currentStyle.printAccent} !important;
                  margin: 8px auto 16px;
                }
                .certifies {
                  font-size: 13px;
                  font-style: italic;
                  opacity: 0.8;
                  margin-bottom: 6px;
                }
                .user-name {
                  font-size: 38px;
                  font-weight: 900;
                  font-family: Georgia, serif;
                  color: ${currentStyle.printAccent} !important;
                  margin: 8px 0 14px;
                  text-decoration: underline;
                  text-decoration-color: ${currentStyle.printAccent} !important;
                  text-underline-offset: 8px;
                }
                .desc {
                  font-size: 13px;
                  max-width: 580px;
                  margin: 0 auto 22px;
                  line-height: 1.6;
                  opacity: 0.9;
                }
                .stats-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 16px;
                  max-width: 480px;
                  margin: 0 auto 26px;
                }
                .stat-box {
                  background: ${currentStyle.printStatBg} !important;
                  border: 1px solid rgba(148, 163, 184, 0.25) !important;
                  border-radius: 12px;
                  padding: 12px 8px;
                }
                .stat-label {
                  font-size: 10px;
                  font-weight: 700;
                  opacity: 0.7;
                  text-transform: uppercase;
                }
                .stat-val {
                  font-size: 24px;
                  font-weight: 900;
                  font-family: monospace;
                  color: #10b981 !important;
                  margin-top: 2px;
                }
                .stat-tier {
                  font-size: 13px;
                  font-weight: 900;
                  color: ${currentStyle.printAccent} !important;
                  margin-top: 4px;
                }
                .footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-top: 1px solid rgba(148, 163, 184, 0.2);
                  padding-top: 18px;
                  font-size: 11px;
                  opacity: 0.8;
                }
                .seal {
                  width: 52px;
                  height: 52px;
                  border: 2px solid ${currentStyle.printAccent} !important;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: ${currentStyle.printAccent} !important;
                  font-size: 24px;
                }
              </style>
            </head>
            <body>
              <div class="cert-card">
                <div class="corner tl">❖</div>
                <div class="corner tr">❖</div>
                <div class="corner bl">❖</div>
                <div class="corner br">❖</div>

                <div class="sub-title">Official Verification Document</div>
                <div class="cert-title">TypeMaster Pro</div>
                <div class="cert-divider"></div>

                <div class="certifies">This certifies that</div>
                <div class="user-name">${userName}</div>
                <div class="desc">
                  has demonstrated exceptional touch typing proficiency and passed the standardized keystroke speed & accuracy assessment with distinction.
                </div>

                <div class="stats-grid">
                  <div class="stat-box">
                    <div class="stat-label">Verified Speed</div>
                    <div class="stat-val">${wpm} WPM</div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-label">Accuracy</div>
                    <div class="stat-val" style="color: #6366f1 !important;">${accuracy}%</div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-label">Rank Tier</div>
                    <div class="stat-tier">${rankTier}</div>
                  </div>
                </div>

                <div class="footer">
                  <div style="text-align: left;">
                    <div><strong>Certificate ID:</strong> ${certId}</div>
                    <div>${certDate}</div>
                  </div>
                  <div class="seal">★</div>
                  <div style="text-align: right;">
                    <div style="font-family: Georgia, serif; font-style: italic; font-weight: bold;">Aura AI Assessment</div>
                    <div>Board of Certification</div>
                  </div>
                </div>
              </div>
              <script>
                window.onload = function() {
                  window.focus();
                  window.print();
                  window.onafterprint = function() { window.close(); };
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        return;
      }
    } catch (e) {}

    window.print();
  };

  // Download high-resolution PNG image directly using HTML5 Canvas
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background based on selected theme
    ctx.fillStyle = currentStyle.printBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Certificate inner container
    ctx.fillStyle = currentStyle.printStatBg;
    ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Border
    ctx.strokeStyle = currentStyle.printBorder;
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Decorative inner thin border
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

    // Header text
    ctx.fillStyle = currentStyle.printAccent;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OFFICIAL VERIFICATION DOCUMENT', canvas.width / 2, 110);

    ctx.fillStyle = currentStyle.printText;
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText('TypeMaster Pro', canvas.width / 2, 170);

    // Divider
    ctx.strokeStyle = currentStyle.printAccent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 80, 190);
    ctx.lineTo(canvas.width / 2 + 80, 190);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillText('This certifies that', canvas.width / 2, 230);

    // User name
    ctx.fillStyle = currentStyle.printAccent;
    ctx.font = 'bold 50px Georgia, serif';
    ctx.fillText(userName, canvas.width / 2, 300);

    // Underline
    ctx.strokeStyle = currentStyle.printAccent;
    ctx.lineWidth = 3;
    const nameWidth = ctx.measureText(userName).width;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - nameWidth / 2 - 10, 315);
    ctx.lineTo(canvas.width / 2 + nameWidth / 2 + 10, 315);
    ctx.stroke();

    // Description
    ctx.fillStyle = currentStyle.printText;
    ctx.font = '18px sans-serif';
    ctx.fillText(
      'has demonstrated exceptional touch typing proficiency and passed the',
      canvas.width / 2,
      365
    );
    ctx.fillText(
      'standardized keystroke speed & accuracy assessment with distinction.',
      canvas.width / 2,
      395
    );

    // 3 Stat Boxes
    const boxY = 440;
    const boxWidth = 220;
    const boxHeight = 110;
    const gap = 30;
    const startX = (canvas.width - (boxWidth * 3 + gap * 2)) / 2;

    // Box 1: WPM
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(startX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(startX, boxY, boxWidth, boxHeight);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('VERIFIED SPEED', startX + boxWidth / 2, boxY + 35);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(`${wpm} WPM`, startX + boxWidth / 2, boxY + 80);

    // Box 2: Accuracy
    const b2X = startX + boxWidth + gap;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(b2X, boxY, boxWidth, boxHeight);
    ctx.strokeRect(b2X, boxY, boxWidth, boxHeight);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('ACCURACY', b2X + boxWidth / 2, boxY + 35);
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(`${accuracy}%`, b2X + boxWidth / 2, boxY + 80);

    // Box 3: Rank
    const b3X = b2X + boxWidth + gap;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(b3X, boxY, boxWidth, boxHeight);
    ctx.strokeRect(b3X, boxY, boxWidth, boxHeight);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('RANK TIER', b3X + boxWidth / 2, boxY + 35);
    ctx.fillStyle = currentStyle.printAccent;
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(rankTier, b3X + boxWidth / 2, boxY + 75);

    // Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`ID: ${certId}`, 90, 680);
    ctx.fillText(`Date: ${certDate}`, 90, 705);

    // Seal
    ctx.strokeStyle = currentStyle.printAccent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 690, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = currentStyle.printAccent;
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★', canvas.width / 2, 698);

    ctx.fillStyle = currentStyle.printText;
    ctx.font = 'italic bold 16px Georgia, serif';
    ctx.textAlign = 'right';
    ctx.fillText('Aura AI Assessment', canvas.width - 90, 685);
    ctx.fillStyle = '#64748b';
    ctx.font = '13px sans-serif';
    ctx.fillText('Board of Certification', canvas.width - 90, 710);

    // Trigger download
    const link = document.createElement('a');
    link.download = `TypeMaster-Certificate-${userName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {!isGenerated ? (
          /* Step 1: Input Name Form */
          <div className="text-center space-y-4 py-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 mx-auto shadow-lg shadow-amber-500/20">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Claim Official Typing Certificate
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Generate a verified certificate of speed & accuracy for your portfolio, LinkedIn, or resume.
              </p>
            </div>

            {/* Quick stats snapshot */}
            <div className="flex justify-center gap-4 py-2">
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Speed</span>
                <span className="text-xl font-black font-mono text-emerald-400">{wpm} WPM</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                <span className="text-xl font-black font-mono text-indigo-400">{accuracy}%</span>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-3">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your Full Name..."
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 text-center font-bold"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-indigo-600 to-sky-500 text-white font-black text-xs uppercase tracking-wider shadow-glow-accent hover:opacity-95 transition-all"
              >
                Generate Verified Certificate
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: The High-Res Certificate View with Theme Selector */
          <div className="space-y-4">
            
            {/* Top Toolbar: Theme Selector + Download Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs no-print">
              
              {/* 3 Luxury Themes Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold px-1.5 uppercase">Style:</span>
                {[
                  { id: 'obsidian', label: '👑 Obsidian Gold' },
                  { id: 'ivory', label: '📜 Royal Ivory' },
                  { id: 'cyber', label: '⚡ Cyber Neon' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCertTheme(t.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      certTheme === t.id
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadImage}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                  title="Download Certificate as PNG image file"
                >
                  <FileImage className="w-3.5 h-3.5 text-indigo-400" /> Save Image (.PNG)
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  title="Print or Save as Full-Color PDF"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Full-Color PDF
                </button>
              </div>
            </div>

            {/* CERTIFICATE CANVAS (PRINTABLE DOCUMENT ONLY) */}
            <div 
              id="certificate-printable-card"
              ref={certRef}
              className={`relative ${currentStyle.bg} ${currentStyle.border} rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl overflow-hidden transition-all duration-300`}
            >
              {/* Corner Ornaments */}
              <div className={`absolute top-2 left-2 ${currentStyle.textAccent} text-2xl font-serif`}>❖</div>
              <div className={`absolute top-2 right-2 ${currentStyle.textAccent} text-2xl font-serif`}>❖</div>
              <div className={`absolute bottom-2 left-2 ${currentStyle.textAccent} text-2xl font-serif`}>❖</div>
              <div className={`absolute bottom-2 right-2 ${currentStyle.textAccent} text-2xl font-serif`}>❖</div>

              {/* Watermark / Logo */}
              <div className="space-y-1">
                <span className={`text-[11px] font-black uppercase tracking-[0.25em] ${currentStyle.textAccent} block`}>
                  Official Verification Document
                </span>
                <h2 className={`text-2xl sm:text-3xl font-serif font-black ${currentStyle.textTitle} tracking-wide`}>
                  TypeMaster Pro
                </h2>
                <div className={`w-24 h-0.5 ${currentStyle.divider} mx-auto mt-1`} />
              </div>

              {/* Certificate Body Text */}
              <div className="space-y-2 py-2">
                <p className="text-xs opacity-75 italic">
                  This certifies that
                </p>
                <div className={`text-2xl sm:text-3xl font-serif font-extrabold ${currentStyle.textName} underline underline-offset-8`}>
                  {userName}
                </div>
                <p className="text-xs opacity-85 max-w-md mx-auto pt-2 leading-relaxed">
                  has demonstrated exceptional touch typing proficiency and passed the standardized keystroke speed & accuracy assessment with distinction.
                </p>
              </div>

              {/* Score Badges */}
              <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto py-2">
                <div className={`p-2.5 rounded-xl border ${currentStyle.statBg}`}>
                  <span className="text-[9px] font-bold opacity-75 uppercase block">Speed</span>
                  <span className="text-xl font-black font-mono text-emerald-400">{wpm} WPM</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${currentStyle.statBg}`}>
                  <span className="text-[9px] font-bold opacity-75 uppercase block">Accuracy</span>
                  <span className="text-xl font-black font-mono text-indigo-400">{accuracy}%</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${currentStyle.statBg}`}>
                  <span className="text-[9px] font-bold opacity-75 uppercase block">Rank Tier</span>
                  <span className={`text-xs font-black ${currentStyle.textAccent} block truncate`}>{rankTier}</span>
                </div>
              </div>

              {/* Footer Verification Seal, QR Code & Signature */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-[10px] opacity-80">
                <div className="text-left space-y-0.5">
                  <div className="font-mono"><strong>ID:</strong> {certId}</div>
                  <div>{certDate}</div>
                </div>

                {/* Gold Seal Icon */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${currentStyle.sealColor}`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div className="text-right space-y-0.5">
                  <div className="font-serif italic font-bold">Aura AI Assessment</div>
                  <div>Board of Certification</div>
                </div>
              </div>

            </div>

            <div className="text-center pt-1 no-print">
              <button
                onClick={() => setIsGenerated(false)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Edit Name
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
