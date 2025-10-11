import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const Home: React.FC = () => {
  const fullText = "a software engineer, technologist and founder.";
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [secondLineText, setSecondLineText] = useState("");
  const [secondLineCursorVisible, setSecondLineCursorVisible] = useState(false);
  const [isSecondLineAnimating, setIsSecondLineAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [userClickedBeforeReady, setUserClickedBeforeReady] = useState(false);
  const [userHasMuted, setUserHasMuted] = useState(false);
  const [isInSocialMedia, setIsInSocialMedia] = useState(false);
  
  // Detect if we're in a social media iframe/webview
  useEffect(() => {
    const checkSocialMedia = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isInFrame = window.self !== window.top;
      const isInstagram = userAgent.includes('instagram');
      const isTwitter = userAgent.includes('twitter') || userAgent.includes('x.com');
      const isFacebook = userAgent.includes('facebook');
      
      const inSocialMedia = isInFrame || isInstagram || isTwitter || isFacebook;
      setIsInSocialMedia(inSocialMedia);
      
      if (inSocialMedia) {
        console.log('Detected social media environment:', { isInFrame, isInstagram, isTwitter, isFacebook });
      }
    };
    
    checkSocialMedia();
  }, []);
  
  // Debug logging for state changes
  useEffect(() => {
    console.log('State update:', { hasUserInteracted, isAudioReady, isAudioPlaying, userClickedBeforeReady, userHasMuted, isInSocialMedia });
  }, [hasUserInteracted, isAudioReady, isAudioPlaying, userClickedBeforeReady, userHasMuted, isInSocialMedia]);
  const [balls, setBalls] = useState<Ball[]>([]);
  const ballIdRef = useRef(0);
  const animationRef = useRef<number>();
  const pageRef = useRef<HTMLDivElement>(null);
  const imagePixelDataRef = useRef<ImageData | null>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio toggle function
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      console.log('User manually muted audio');
      audio.pause();
      setIsAudioPlaying(false);
      setUserHasMuted(true); // User explicitly muted
    } else {
      console.log('User manually unmuted audio');
      setUserHasMuted(false); // User explicitly unmuted
      audio.play().then(() => {
        setIsAudioPlaying(true);
        setIsAudioMuted(false);
      }).catch((error) => {
        console.log('Audio play failed:', error);
      });
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    let i = 0;
    const stepMs = 65;
    const timeouts: number[] = [];
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i += 1;
      } else {
        clearInterval(timer);
        clearInterval(cursorTimer);
        // Blink the cursor twice, then hide and show final version with links
        setCursorVisible(true);
        const d = 250; // blink speed
        timeouts.push(window.setTimeout(() => setCursorVisible(false), d));
        timeouts.push(window.setTimeout(() => setCursorVisible(true), d * 2));
        timeouts.push(window.setTimeout(() => setCursorVisible(false), d * 3));
        timeouts.push(window.setTimeout(() => setCursorVisible(true), d * 4));
        timeouts.push(window.setTimeout(() => {
          setCursorVisible(false);
          setTypingComplete(true);
        }, d * 5));
      }
    }, stepMs);

    const cursorTimer = setInterval(() => setCursorVisible((v) => !v), 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Second line animation effect
  useEffect(() => {
    if (!typingComplete) return;

    const words = ['leader', 'trailblazer', 'vanguard', 'relentless dev'];
    let currentWordIndex = 0;
    let currentText = '';
    
    const startCycle = () => {
      setIsSecondLineAnimating(true);
      setSecondLineCursorVisible(true);
      
      // Start typing "a " first
      typeA();
    };

    const typeA = () => {
      currentText = 'a ';
      setSecondLineText(currentText);
      
      // Small delay then start typing first word
      setTimeout(() => {
        typeNewWord();
      }, 100);
    };

    const backspaceToA = () => {
      const backspaceInterval = setInterval(() => {
        currentText = currentText.slice(0, -1);
        setSecondLineText(currentText);
        
        if (currentText === 'a ') {
          clearInterval(backspaceInterval);
          // Start typing new word
          typeNewWord();
        }
      }, 50);
    };

    const typeNewWord = () => {
      const wordToType = words[currentWordIndex] + '.';
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex < wordToType.length) {
          currentText = 'a ' + wordToType.slice(0, charIndex + 1);
          setSecondLineText(currentText);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          
          // Wait before next cycle
          setTimeout(() => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            if (currentWordIndex === 0) {
              // After last word, stop animation and hide cursor
              setSecondLineCursorVisible(false);
              setIsSecondLineAnimating(false);
            } else {
              backspaceToA();
            }
          }, 1000); // Wait 1 second before next word
        }
      }, 100);
    };

    // Start the animation after a delay
    const startDelay = setTimeout(startCycle, 1000);

    return () => {
      clearTimeout(startDelay);
    };
  }, [typingComplete]);

  // Second line cursor animation
  useEffect(() => {
    if (!isSecondLineAnimating) return;

    const cursorTimer = setInterval(() => {
      setSecondLineCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [isSecondLineAnimating]);

  // Physics constants
  const GRAVITY = 0.98; // More realistic gravity acceleration
  const BOUNCE_DAMPING = 0.65; // More realistic energy loss on bounce
  const FRICTION = 0.985; // Slight air resistance
  const MIN_BOUNCE_VELOCITY = 0.5; // Stop bouncing when velocity is too low

  // Create a new ball at click position
  const createBall = useCallback((x: number, y: number) => {
    const newBall: Ball = {
      id: ballIdRef.current++,
      x,
      y,
      vx: (Math.random() - 0.5) * 4, // Random horizontal velocity
      vy: 0, // Start with no vertical velocity
      radius: 5, // Fixed smaller size for all balls
      color: '#e0a800' // All balls are now gold
    };
    
    setBalls(prev => [...prev, newBall]);
    
    // Remove ball after 10 seconds to prevent memory issues
    setTimeout(() => {
      setBalls(prev => prev.filter(ball => ball.id !== newBall.id));
    }, 10000);
  }, []);

  // Auto-start audio on first user interaction
  const startAudioOnInteraction = useCallback(() => {
    const audio = audioRef.current;
    console.log('startAudioOnInteraction called:', { hasUserInteracted, isAudioReady, audioExists: !!audio, isAudioPlaying, userHasMuted });
    
    // Don't auto-start if user has explicitly muted
    if (userHasMuted) {
      console.log('User has muted audio, skipping auto-start');
      return;
    }
    
    // Only try to start if audio isn't already playing
    if (audio && !isAudioPlaying) {
      setHasUserInteracted(true); // Mark that user has interacted
      
      if (isAudioReady) {
        // Audio is ready, try to play immediately
        console.log('Attempting to play audio now...');
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Audio started successfully');
            setIsAudioPlaying(true);
            setIsAudioMuted(false);
          }).catch((error) => {
            console.log('Audio autoplay failed:', error);
          });
        }
      } else {
        // Audio not ready yet, mark for later retry
        console.log('User clicked but audio not ready - will retry when ready');
        setUserClickedBeforeReady(true);
      }
    } else if (isAudioPlaying) {
      console.log('Audio is already playing, skipping');
    }
  }, [hasUserInteracted, isAudioReady, isAudioPlaying, userHasMuted]);

  // Handle page clicks
  const handlePageClick = useCallback((e: React.MouseEvent) => {
    console.log('Page clicked, attempting to start audio');
    // Start audio on first interaction
    startAudioOnInteraction();
    
    // Additional direct attempt for stubborn mobile browsers (only if not muted)
    if (!isAudioPlaying && !userHasMuted && audioRef.current && isAudioReady) {
      console.log('Direct audio play attempt from click handler');
      audioRef.current.play().then(() => {
        console.log('Direct audio start successful');
        setIsAudioPlaying(true);
        setIsAudioMuted(false);
      }).catch((error) => {
        console.log('Direct audio start failed:', error);
      });
    }
    
    // Don't create balls if clicking on links
    if ((e.target as HTMLElement).tagName === 'A') return;
    
    const rect = pageRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createBall(x, y);
    }
  }, [createBall, startAudioOnInteraction, isAudioPlaying, isAudioReady]);

  // Extract pixel data from image for collision detection
  const extractImagePixelData = useCallback(() => {
    const img = pageRef.current?.querySelector('img') as HTMLImageElement;
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Create canvas to read pixel data
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // Draw image to canvas
    ctx.drawImage(img, 0, 0);
    
    try {
      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      imagePixelDataRef.current = imageData;
      imageCanvasRef.current = canvas;
    } catch (error) {
      console.log('Could not extract image pixel data:', error);
    }
  }, []);

  // Check if a point in the image has visible pixels (not transparent)
  const isImagePixelSolid = useCallback((imgX: number, imgY: number, imgWidth: number, imgHeight: number) => {
    if (!imagePixelDataRef.current) return false;
    
    const data = imagePixelDataRef.current.data;
    const canvasWidth = imagePixelDataRef.current.width;
    const canvasHeight = imagePixelDataRef.current.height;
    
    // Convert image display coordinates to canvas coordinates
    const canvasX = Math.floor((imgX / imgWidth) * canvasWidth);
    const canvasY = Math.floor((imgY / imgHeight) * canvasHeight);
    
    // Check bounds
    if (canvasX < 0 || canvasX >= canvasWidth || canvasY < 0 || canvasY >= canvasHeight) {
      return false;
    }
    
    // Get alpha channel (4th component of RGBA)
    const pixelIndex = (canvasY * canvasWidth + canvasX) * 4;
    const alpha = data[pixelIndex + 3];
    
    // Consider pixel solid if alpha > threshold (not fully transparent)
    return alpha > 50; // Adjust threshold as needed
  }, []);

  // Initialize image pixel data when image loads
  useEffect(() => {
    const img = pageRef.current?.querySelector('img');
    if (img) {
      if (img.complete) {
        extractImagePixelData();
      } else {
        img.addEventListener('load', extractImagePixelData);
        return () => img.removeEventListener('load', extractImagePixelData);
      }
    }
  }, [extractImagePixelData]);

  // Add global event listeners for user interactions to start audio
  useEffect(() => {
    if (hasUserInteracted) return;

    console.log('Setting up global event listeners for audio autoplay');

    const handleUserInteraction = (event: Event) => {
      // Only respond to "active" interactions that grant audio permissions
      const activeEvents = ['click', 'touchstart', 'touchend', 'keydown'];
      if (activeEvents.includes(event.type)) {
        console.log('Active user interaction detected:', event.type);
        
        // For mobile, add a small delay to ensure touch is fully registered
        if (event.type === 'touchstart' || event.type === 'touchend') {
          setTimeout(() => {
            startAudioOnInteraction();
          }, 100);
        } else {
          startAudioOnInteraction();
        }
      }
    };

    // Listen for active user interaction events including touchend for mobile
    const events = ['click', 'touchstart', 'touchend', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      console.log('Cleaning up global event listeners');
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [hasUserInteracted, startAudioOnInteraction]);

  // Get collision boundaries for image only (text is ignored)
  const getCollisionBoundaries = useCallback(() => {
    // Return empty array - no text collision boundaries
    // Only image collision will be handled with pixel-perfect detection
    return [];
  }, []);

  // Physics animation loop
  useEffect(() => {
    const animate = () => {
      setBalls(prevBalls => {
        if (prevBalls.length === 0) return prevBalls;
        
        const boundaries = getCollisionBoundaries();
        const pageRect = pageRef.current?.getBoundingClientRect();
        
        if (!pageRect) return prevBalls;
        
        return prevBalls.map(ball => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx * FRICTION;
          let newVy = ball.vy + GRAVITY;
          
          // Check collision with page boundaries
          if (newX - ball.radius <= 0 || newX + ball.radius >= pageRect.width) {
            newVx = -newVx * BOUNCE_DAMPING;
            newX = ball.radius <= newX ? pageRect.width - ball.radius : ball.radius;
          }
          
          if (newY + ball.radius >= pageRect.height) {
            // Stop bouncing if velocity is too low (ball settles)
            if (Math.abs(newVy) < MIN_BOUNCE_VELOCITY) {
              newVy = 0;
              newVx = newVx * 0.95; // Apply ground friction when rolling
            } else {
              newVy = -newVy * BOUNCE_DAMPING;
            }
            newY = pageRect.height - ball.radius;
          }
          
          // Check collision with text/image boundaries
          boundaries.forEach(boundary => {
            const ballLeft = newX - ball.radius;
            const ballRight = newX + ball.radius;
            const ballTop = newY - ball.radius;
            const ballBottom = newY + ball.radius;
            
            // Check if ball is colliding with boundary
            if (ballRight > boundary.x && 
                ballLeft < boundary.x + boundary.width &&
                ballBottom > boundary.y && 
                ballTop < boundary.y + boundary.height) {
              
              // Calculate overlap distances
              const overlapLeft = ballRight - boundary.x;
              const overlapRight = (boundary.x + boundary.width) - ballLeft;
              const overlapTop = ballBottom - boundary.y;
              const overlapBottom = (boundary.y + boundary.height) - ballTop;
              
              // Find minimum overlap to determine collision side
              const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
              
              // Add minimum separation distance to prevent sticking
              const separation = 2;
              
              if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                // Horizontal collision
                newVx = -Math.abs(newVx) * BOUNCE_DAMPING * (minOverlap === overlapLeft ? -1 : 1);
                if (minOverlap === overlapLeft) {
                  newX = boundary.x - ball.radius - separation;
                } else {
                  newX = boundary.x + boundary.width + ball.radius + separation;
                }
              } else {
                // Vertical collision
                if (Math.abs(newVy) < MIN_BOUNCE_VELOCITY) {
                  newVy = 0;
                } else {
                  newVy = -Math.abs(newVy) * BOUNCE_DAMPING * (minOverlap === overlapTop ? -1 : 1);
                }
                if (minOverlap === overlapTop) {
                  newY = boundary.y - ball.radius - separation;
                } else {
                  newY = boundary.y + boundary.height + ball.radius + separation;
                }
              }
            }
          });
          
          // Pixel-perfect collision detection for image
          const img = pageRef.current?.querySelector('img') as HTMLImageElement;
          if (img && img.complete && imagePixelDataRef.current) {
            const imgRect = img.getBoundingClientRect();
            const pageRect = pageRef.current!.getBoundingClientRect();
            const imgX = imgRect.left - pageRect.left;
            const imgY = imgRect.top - pageRect.top;
            const imgWidth = imgRect.width;
            const imgHeight = imgRect.height;
            
            // Check if ball overlaps with image area
            const ballLeft = newX - ball.radius;
            const ballRight = newX + ball.radius;
            const ballTop = newY - ball.radius;
            const ballBottom = newY + ball.radius;
            
            if (ballRight > imgX && ballLeft < imgX + imgWidth &&
                ballBottom > imgY && ballTop < imgY + imgHeight) {
              
              // Sample multiple points around the ball's circumference
              const samplePoints = 16;
              let hasCollision = false;
              let collisionNormalX = 0;
              let collisionNormalY = 0;
              let collisionCount = 0;
              
              for (let i = 0; i < samplePoints; i++) {
                const angle = (i / samplePoints) * Math.PI * 2;
                const sampleX = newX + Math.cos(angle) * ball.radius;
                const sampleY = newY + Math.sin(angle) * ball.radius;
                
                // Convert to image coordinates
                const imgLocalX = sampleX - imgX;
                const imgLocalY = sampleY - imgY;
                
                if (imgLocalX >= 0 && imgLocalX < imgWidth && 
                    imgLocalY >= 0 && imgLocalY < imgHeight) {
                  
                  if (isImagePixelSolid(imgLocalX, imgLocalY, imgWidth, imgHeight)) {
                    hasCollision = true;
                    // Calculate normal from ball center to collision point
                    collisionNormalX += Math.cos(angle);
                    collisionNormalY += Math.sin(angle);
                    collisionCount++;
                  }
                }
              }
              
              if (hasCollision && collisionCount > 0) {
                // Average the collision normal
                collisionNormalX /= collisionCount;
                collisionNormalY /= collisionCount;
                
                // Normalize the collision normal
                const normalLength = Math.sqrt(collisionNormalX * collisionNormalX + collisionNormalY * collisionNormalY);
                if (normalLength > 0) {
                  collisionNormalX /= normalLength;
                  collisionNormalY /= normalLength;
                  
                  // Reflect velocity based on collision normal
                  const dotProduct = newVx * collisionNormalX + newVy * collisionNormalY;
                  newVx = (newVx - 2 * dotProduct * collisionNormalX) * BOUNCE_DAMPING;
                  newVy = (newVy - 2 * dotProduct * collisionNormalY) * BOUNCE_DAMPING;
                  
                  // Push ball out of collision area
                  const pushDistance = ball.radius + 3;
                  newX = newX - collisionNormalX * pushDistance;
                  newY = newY - collisionNormalY * pushDistance;
                }
              }
            }
          }
          
          return {
            ...ball,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (balls.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [balls.length, getCollisionBoundaries]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-black relative overflow-hidden cursor-crosshair"
      style={{ fontFamily: '"Times New Roman", Times, serif', color: '#e0a800' }}
      onClick={handlePageClick}
    >
            {/* Background audio with enhanced mobile compatibility */}
      <audio
        ref={audioRef}
        src="/audio/backgroundnoise.mp3"
        loop
        muted={false}
        preload="auto"
        playsInline
        style={{ display: 'none' }}
        onCanPlayThrough={() => {
          // Audio is ready to play
          console.log('Audio can play through - setting ready state');
          if (audioRef.current) {
            audioRef.current.volume = 0.4;
            setIsAudioReady(true);
            
            // If user clicked before audio was ready, try to start now (only if not muted)
            if (userClickedBeforeReady && !isAudioPlaying && !userHasMuted) {
              console.log('Audio ready after user interaction - attempting to start');
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise.then(() => {
                  console.log('Audio started successfully after ready');
                  setIsAudioPlaying(true);
                  setIsAudioMuted(false);
                  setUserClickedBeforeReady(false); // Reset the flag
                }).catch((error) => {
                  console.log('Audio play failed after ready:', error);
                });
              }
            }
          }
        }}
        onLoadedData={() => {
          console.log('Audio data loaded');
        }}
        onPlay={() => {
          console.log('Audio started playing');
          setIsAudioPlaying(true);
        }}
        onPause={() => {
          console.log('Audio paused');
          setIsAudioPlaying(false);
        }}
        onEnded={() => setIsAudioPlaying(false)}
        onError={(e) => {
          console.log('Audio error:', e);
        }}
      />
      {/* Audio button - top right corner for all devices with enhanced visibility for social media */}
      {(isAudioReady || isInSocialMedia) && (
        <button
          onClick={toggleAudio}
          className={`fixed top-6 right-6 text-[#e0a800] hover:text-[#ffd700] transition-colors duration-200 p-3 pointer-events-auto group rounded-full backdrop-blur-sm ${
            isInSocialMedia ? 'bg-black/60 border border-[#e0a800]/30' : 'bg-black/30'
          }`}
          style={{ 
            zIndex: 99999,
            position: 'fixed' as const,
            isolation: 'isolate',
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform',
            display: 'block',
            visibility: 'visible' as const,
            opacity: isAudioReady ? 1 : (isInSocialMedia ? 0.7 : 1)
          }}
          aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
          title={isAudioPlaying ? "Pause audio" : "Play audio"}
        >
          {!isAudioPlaying ? (
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-all duration-200"
            >
              <polygon 
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" 
                fill="none" 
                className="group-hover:fill-[#ffd700]"
              />
              <line x1="22" y1="9" x2="16" y2="15"></line>
              <line x1="16" y1="9" x2="22" y2="15"></line>
            </svg>
          ) : (
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-all duration-200"
            >
              <polygon 
                points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" 
                fill="none" 
                className="group-hover:fill-[#ffd700]"
              />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      )}

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-0 md:pt-12 md:pb-12 grid md:grid-cols-2 gap-10 items-start overflow-visible">
        <div className="relative z-40">
          <h1 className="text-5xl mb-2">"Jeffrey Escobar"</h1>
          <p className="italic text-lg mb-1">/ǰɛfri/ɛskobar/</p>
          <p className="text-lg mb-6">(human)</p>

          <ol className="list-decimal pl-6 space-y-3 text-lg leading-relaxed">
            <li>
              <span>
                {typingComplete ? (
                  <>
                    a software engineer, <a href="#technologist" className="underline relative z-50 pointer-events-auto">technologist</a> and <a href="#founder" className="underline relative z-50 pointer-events-auto">founder</a>.
                  </>
                ) : (
                  <>
                    {typedText}
                    <span style={{ visibility: cursorVisible ? 'visible' : 'hidden' }}>|</span>
                  </>
                )}
              </span>
            </li>
            <li>
              <span>
                {secondLineText && (
                  <>
                    {secondLineText}
                    {isSecondLineAnimating && (
                      <span style={{ visibility: secondLineCursorVisible ? 'visible' : 'hidden' }}>|</span>
                    )}
                  </>
                )}
              </span>
            </li>
            <li>
              ヽ(´ー｀)ﾉ
            </li>
          </ol>
          
          <div className="mt-12 relative z-50">
            <p className="text-lg">
              <Link to="/links" className="underline hover:opacity-70 transition-opacity relative z-50 pointer-events-auto">
                socials
              </Link>
            </p>
            <p className="text-lg mt-2">
              <a 
                href="https://www.breeze.engineer/landing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity relative z-50 pointer-events-auto"
              >
                breeze
              </a>
            </p>
            <p className="text-lg mt-2">
              <a 
                href="https://www.fredai.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity relative z-50 pointer-events-auto"
              >
                fred ai
              </a>
            </p>
          </div>
        </div>

        <div className="w-full flex justify-start md:justify-end overflow-visible -mt-14 md:mt-0">
          <div className="p-4 rounded overflow-visible md:mr-8 -ml-80 md:ml-0">
            <img
              src="/images/escobar.png"
              alt="Escobar"
              className="h-auto md:transform md:translate-x-[-50px] md:translate-y-[32px]"
              style={{
                // Responsive width - mobile 2x larger, desktop unchanged
                width: window.innerWidth > 768 ? '1000px' : window.innerWidth > 640 ? '800px' : '180vw',
                maxWidth: window.innerWidth <= 640 ? '180vw' : 'none',
                // Gold tint suitable for dark backgrounds
                filter:
                  "sepia(1) saturate(700%) hue-rotate(5deg) brightness(0.95) contrast(1.05)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Render bouncing balls */}
      {balls.map(ball => (
        <div
          key={ball.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ball.x - ball.radius,
            top: ball.y - ball.radius,
            width: ball.radius * 2,
            height: ball.radius * 2,
            backgroundColor: ball.color,
            boxShadow: `0 0 ${ball.radius}px ${ball.color}40`,
            transition: 'none',
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};

export default Home;


