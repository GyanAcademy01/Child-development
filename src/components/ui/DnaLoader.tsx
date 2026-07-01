"use client";

export default function DnaLoader({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="dna-loader-wrapper">
            <div className="dna-helix">
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="dna-pair" style={{ animationDelay: `${i * 0.12}s` }}>
                        <div className="dna-dot dna-top" style={{ animationDelay: `${i * 0.12}s` }} />
                        <div className="dna-dot dna-bottom" style={{ animationDelay: `${i * 0.12}s` }} />
                    </div>
                ))}
            </div>
            <div className="dna-text">{text}</div>

            <style jsx>{`
                .dna-loader-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 60vh;
                    gap: 0;
                }
                .dna-helix {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    height: 60px;
                }
                .dna-pair {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 60px;
                    position: relative;
                }
                .dna-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    position: absolute;
                }
                .dna-top {
                    animation: dnaTop 1.6s ease-in-out infinite;
                }
                .dna-bottom {
                    animation: dnaBottom 1.6s ease-in-out infinite;
                }
                .dna-pair:nth-child(1) .dna-top { background: #6366f1; }
                .dna-pair:nth-child(1) .dna-bottom { background: #ec4899; }
                .dna-pair:nth-child(2) .dna-top { background: #7c3aed; }
                .dna-pair:nth-child(2) .dna-bottom { background: #f472b6; }
                .dna-pair:nth-child(3) .dna-top { background: #8b5cf6; }
                .dna-pair:nth-child(3) .dna-bottom { background: #fb7185; }
                .dna-pair:nth-child(4) .dna-top { background: #a855f7; }
                .dna-pair:nth-child(4) .dna-bottom { background: #f43f5e; }
                .dna-pair:nth-child(5) .dna-top { background: #c084fc; }
                .dna-pair:nth-child(5) .dna-bottom { background: #e11d48; }
                .dna-pair:nth-child(6) .dna-top { background: #d946ef; }
                .dna-pair:nth-child(6) .dna-bottom { background: #be185d; }
                .dna-pair:nth-child(7) .dna-top { background: #e879f9; }
                .dna-pair:nth-child(7) .dna-bottom { background: #9f1239; }
                .dna-pair:nth-child(8) .dna-top { background: #f0abfc; }
                .dna-pair:nth-child(8) .dna-bottom { background: #881337; }
                .dna-text {
                    margin-top: 28px;
                    font-size: 13px;
                    color: #a78bfa;
                    letter-spacing: 3px;
                    font-weight: 500;
                    text-transform: uppercase;
                    animation: dnaTextPulse 1.5s ease-in-out infinite;
                }
                @keyframes dnaTop {
                    0% { top: 0; opacity: 1; transform: scale(1); }
                    50% { top: 50px; opacity: 0.3; transform: scale(0.6); }
                    100% { top: 0; opacity: 1; transform: scale(1); }
                }
                @keyframes dnaBottom {
                    0% { top: 50px; opacity: 0.3; transform: scale(0.6); }
                    50% { top: 0; opacity: 1; transform: scale(1); }
                    100% { top: 50px; opacity: 0.3; transform: scale(0.6); }
                }
                @keyframes dnaTextPulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
