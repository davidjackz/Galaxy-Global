import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LottieLoaderProps {
  animationUrl?: string;
  size?: number;
  className?: string;
}

export default function LottieLoader({ 
  animationUrl = "https://lottie.host/804d989f-2693-41bb-9730-81df5a71015f/E8d1VvHjZ8.json", // Minimal cinematic loader
  size = 150,
  className = ""
}: LottieLoaderProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationUrl)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Lottie fetch error:", err));
  }, [animationUrl]);

  if (!animationData) return <div className="animate-pulse bg-foreground/5 rounded-full" style={{ width: size, height: size }} />;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div style={{ width: size, height: size }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
