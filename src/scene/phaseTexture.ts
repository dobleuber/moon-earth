import { CanvasTexture, SRGBColorSpace } from 'three';
import type { TargetBody } from '../astronomy/types';

export function createPhaseTexture(target: TargetBody, phaseFraction: number): CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to create phase texture canvas context.');
  }

  const radius = size * 0.45;
  const center = size / 2;
  const baseColor = target === 'earth' ? '#4f8dd8' : '#d8d2bf';
  const landColor = target === 'earth' ? '#58a463' : '#b8b09f';
  const shadowColor = target === 'earth' ? '#061426' : '#080807';

  context.clearRect(0, 0, size, size);
  context.save();
  context.beginPath();
  context.arc(center, center, radius, 0, Math.PI * 2);
  context.clip();

  context.fillStyle = baseColor;
  context.fillRect(0, 0, size, size);

  context.globalAlpha = 0.4;
  context.fillStyle = landColor;
  context.beginPath();
  context.ellipse(center * 0.75, center * 0.85, 36, 18, -0.3, 0, Math.PI * 2);
  context.ellipse(center * 1.25, center * 1.15, 42, 22, 0.4, 0, Math.PI * 2);
  context.fill();
  context.globalAlpha = 1;

  const illuminatedWidth = Math.max(0.02, Math.min(1, phaseFraction)) * size;
  const shadowStart = center - radius + illuminatedWidth;
  context.fillStyle = shadowColor;
  context.fillRect(shadowStart, 0, size - shadowStart, size);

  const gradient = context.createRadialGradient(center * 0.8, center * 0.8, radius * 0.1, center, center, radius);
  gradient.addColorStop(0, 'rgba(255,255,255,0.25)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.35)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  context.restore();

  context.strokeStyle = 'rgba(255,255,255,0.55)';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(center, center, radius, 0, Math.PI * 2);
  context.stroke();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
