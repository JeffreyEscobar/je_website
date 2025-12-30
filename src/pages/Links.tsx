import React from "react";

const Links: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center"
      style={{ fontFamily: '"Times New Roman", Times, serif', color: '#e0a800' }}
    >
      <div className="text-center px-6">
        <h1 className="text-5xl mb-2">"socials"</h1>
        <p className="text-base opacity-90">/soʊʃəlz/</p>
        <p className="text-base mb-12 opacity-90">(digital)</p>
        
        <div className="space-y-6 text-lg">
          <div>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://x.com/JeffEscobars" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  x (twitter)
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/JeffEscobars" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@JeffEscobars" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  tiktok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
