import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import {
  Shield,
  Award,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  CheckCircle2,
  Zap,
  Swords,
  Crown,
  Camera,
  ExternalLink,
  X,
  Navigation,
} from 'lucide-react';

// ============================================================================
// CONTACT CONFIGURATION (100% Thrithala Branch Focus)
// ============================================================================
const CONTACT = {
  phone: '919048681719',
  displayPhone: '+91 90486 81719',
  mapUrl: 'https://maps.google.com/maps?cid=5309736038134553420',
  address: 'Palakkad – Ponnani Road, Thrithala, Kerala 679534',
  landmark: 'Near Bharathapuzha Riverbanks, Thrithala',
};

const openWhatsApp = (phone, messageText) => {
  const url = `https://wa.me/${phone}${
    messageText ? `?text=${encodeURIComponent(messageText)}` : ''
  }`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const callNumber = (phone) => {
  window.location.href = `tel:+${phone}`;
};

// Helper to resolve image paths reliably for Vite
const resolveImageSrc = (src) => {
  if (!src) return '';
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }
  if (src.startsWith('/')) {
    return src;
  }
  return `/images/${src}`;
};

// ============================================================================
// 6 SCROLL-SYNCHRONIZED KEYFRAME STANCES (Normalized coordinates 0 to 1)
// 0: Airborne Flying Kick (Hero)
// 1: Vertical Split Extension (Lineage)
// 2: Combat Side Kick (Disciplines)
// 3: Inverted Acrobatics (Gallery)
// 4: Low Conditioning Stance (Schedule)
// 5: Master Salute (Enquiry)
// ============================================================================
const SCROLL_STANCES = [
  {
    id: 0,
    section: 'Hero',
    label: 'Airborne Flying Kick',
    accentColor: '#EF4444',
    secondaryColor: '#F59E0B',
    joints: {
      head: { x: 0.63, y: 0.41 },
      neck: { x: 0.58, y: 0.43 },
      shoulderL: { x: 0.56, y: 0.40 },
      shoulderR: { x: 0.57, y: 0.47 },
      elbowL: { x: 0.50, y: 0.30 },
      wristL: { x: 0.45, y: 0.21 },
      elbowR: { x: 0.56, y: 0.53 },
      wristR: { x: 0.53, y: 0.50 },
      pelvis: { x: 0.45, y: 0.48 },
      hipL: { x: 0.45, y: 0.45 },
      hipR: { x: 0.44, y: 0.50 },
      kneeL: { x: 0.34, y: 0.41 },
      ankleL: { x: 0.31, y: 0.27 },
      footL: { x: 0.26, y: 0.24 },
      kneeR: { x: 0.31, y: 0.48 },
      ankleR: { x: 0.19, y: 0.43 },
      footR: { x: 0.14, y: 0.45 },
      sashEnd1: { x: 0.41, y: 0.59 },
      sashEnd2: { x: 0.35, y: 0.65 },
      strikeFocus: { x: 0.26, y: 0.24 },
    },
  },
  {
    id: 1,
    section: 'Lineage',
    label: 'Vertical Split Extension',
    accentColor: '#DC2626',
    secondaryColor: '#F59E0B',
    joints: {
      head: { x: 0.60, y: 0.47 },
      neck: { x: 0.56, y: 0.51 },
      shoulderL: { x: 0.51, y: 0.51 },
      shoulderR: { x: 0.60, y: 0.54 },
      elbowL: { x: 0.44, y: 0.51 },
      wristL: { x: 0.38, y: 0.48 },
      elbowR: { x: 0.63, y: 0.56 },
      wristR: { x: 0.58, y: 0.50 },
      pelvis: { x: 0.49, y: 0.58 },
      hipL: { x: 0.47, y: 0.54 },
      hipR: { x: 0.50, y: 0.62 },
      kneeL: { x: 0.43, y: 0.38 },
      ankleL: { x: 0.39, y: 0.21 },
      footL: { x: 0.36, y: 0.17 },
      kneeR: { x: 0.49, y: 0.74 },
      ankleR: { x: 0.48, y: 0.86 },
      footR: { x: 0.53, y: 0.87 },
      sashEnd1: { x: 0.57, y: 0.70 },
      sashEnd2: { x: 0.63, y: 0.79 },
      strikeFocus: { x: 0.38, y: 0.19 },
    },
  },
  {
    id: 2,
    section: 'Disciplines',
    label: 'Combat Side Kick',
    accentColor: '#F59E0B',
    secondaryColor: '#EF4444',
    joints: {
      head: { x: 0.65, y: 0.35 },
      neck: { x: 0.62, y: 0.40 },
      shoulderL: { x: 0.57, y: 0.40 },
      shoulderR: { x: 0.65, y: 0.42 },
      elbowL: { x: 0.50, y: 0.41 },
      wristL: { x: 0.45, y: 0.40 },
      elbowR: { x: 0.67, y: 0.48 },
      wristR: { x: 0.65, y: 0.40 },
      pelvis: { x: 0.56, y: 0.52 },
      hipL: { x: 0.53, y: 0.48 },
      hipR: { x: 0.58, y: 0.55 },
      kneeL: { x: 0.42, y: 0.40 },
      ankleL: { x: 0.30, y: 0.33 },
      footL: { x: 0.26, y: 0.28 },
      kneeR: { x: 0.59, y: 0.70 },
      ankleR: { x: 0.59, y: 0.85 },
      footR: { x: 0.63, y: 0.87 },
      sashEnd1: { x: 0.52, y: 0.60 },
      sashEnd2: { x: 0.47, y: 0.68 },
      strikeFocus: { x: 0.28, y: 0.30 },
    },
  },
  {
    id: 3,
    section: 'Gallery',
    label: 'Inverted Acrobatics',
    accentColor: '#EF4444',
    secondaryColor: '#FBBF24',
    joints: {
      head: { x: 0.48, y: 0.72 },
      neck: { x: 0.49, y: 0.67 },
      shoulderL: { x: 0.44, y: 0.67 },
      shoulderR: { x: 0.55, y: 0.67 },
      elbowL: { x: 0.41, y: 0.77 },
      wristL: { x: 0.39, y: 0.87 },
      elbowR: { x: 0.60, y: 0.77 },
      wristR: { x: 0.61, y: 0.87 },
      pelvis: { x: 0.50, y: 0.51 },
      hipL: { x: 0.45, y: 0.51 },
      hipR: { x: 0.54, y: 0.51 },
      kneeL: { x: 0.41, y: 0.36 },
      ankleL: { x: 0.37, y: 0.21 },
      footL: { x: 0.35, y: 0.16 },
      kneeR: { x: 0.53, y: 0.35 },
      ankleR: { x: 0.47, y: 0.20 },
      footR: { x: 0.49, y: 0.15 },
      sashEnd1: { x: 0.51, y: 0.76 },
      sashEnd2: { x: 0.52, y: 0.83 },
      strikeFocus: { x: 0.42, y: 0.18 },
    },
  },
  {
    id: 4,
    section: 'Schedule',
    label: 'Low Conditioning Stance',
    accentColor: '#DC2626',
    secondaryColor: '#F59E0B',
    joints: {
      head: { x: 0.56, y: 0.54 },
      neck: { x: 0.54, y: 0.59 },
      shoulderL: { x: 0.48, y: 0.60 },
      shoulderR: { x: 0.59, y: 0.60 },
      elbowL: { x: 0.39, y: 0.68 },
      wristL: { x: 0.29, y: 0.76 },
      elbowR: { x: 0.64, y: 0.68 },
      wristR: { x: 0.58, y: 0.74 },
      pelvis: { x: 0.55, y: 0.71 },
      hipL: { x: 0.50, y: 0.72 },
      hipR: { x: 0.59, y: 0.72 },
      kneeL: { x: 0.36, y: 0.77 },
      ankleL: { x: 0.22, y: 0.83 },
      footL: { x: 0.18, y: 0.81 },
      kneeR: { x: 0.67, y: 0.74 },
      ankleR: { x: 0.59, y: 0.84 },
      footR: { x: 0.63, y: 0.85 },
      sashEnd1: { x: 0.51, y: 0.80 },
      sashEnd2: { x: 0.45, y: 0.85 },
      strikeFocus: { x: 0.22, y: 0.82 },
    },
  },
  {
    id: 5,
    section: 'Enquiry',
    label: 'Master Salute',
    accentColor: '#F59E0B',
    secondaryColor: '#EF4444',
    joints: {
      head: { x: 0.50, y: 0.28 },
      neck: { x: 0.50, y: 0.35 },
      shoulderL: { x: 0.42, y: 0.38 },
      shoulderR: { x: 0.58, y: 0.38 },
      elbowL: { x: 0.37, y: 0.48 },
      wristL: { x: 0.48, y: 0.43 },
      elbowR: { x: 0.63, y: 0.48 },
      wristR: { x: 0.52, y: 0.43 },
      pelvis: { x: 0.50, y: 0.56 },
      hipL: { x: 0.45, y: 0.56 },
      hipR: { x: 0.55, y: 0.56 },
      kneeL: { x: 0.43, y: 0.71 },
      ankleL: { x: 0.42, y: 0.86 },
      footL: { x: 0.39, y: 0.88 },
      kneeR: { x: 0.57, y: 0.71 },
      ankleR: { x: 0.58, y: 0.86 },
      footR: { x: 0.61, y: 0.88 },
      sashEnd1: { x: 0.55, y: 0.67 },
      sashEnd2: { x: 0.59, y: 0.76 },
      strikeFocus: { x: 0.50, y: 0.43 },
    },
  },
];

const lerp = (a, b, t) => a + (b - a) * t;

const interpolateJoints = (stanceA, stanceB, t) => {
  const smoothT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const result = {};
  for (const key of Object.keys(stanceA.joints)) {
    const a = stanceA.joints[key];
    const b = stanceB.joints[key];
    result[key] = {
      x: lerp(a.x, b.x, smoothT),
      y: lerp(a.y, b.y, smoothT),
    };
  }
  return result;
};

// ============================================================================
// CONTINUOUS SHADOW WARRIOR CANVAS ENGINE
// Centered in consistent stable screen position with authentic proportions
// ============================================================================
function ScrollSyncedShadowCanvas({ scrollProgress }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const afterimagesRef = useRef([]);
  const embersRef = useRef([]);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    progressRef.current = Math.max(0, Math.min(1, latest));
  });

  useEffect(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      pts.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: -0.0005 - Math.random() * 0.0012,
        size: 1.2 + Math.random() * 2.8,
        alpha: 0.2 + Math.random() * 0.55,
        gold: Math.random() > 0.45,
      });
    }
    embersRef.current = pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const drawLimb = (ctx, p1, p2, r1, r2, fill, rimColor, rimWidth = 2) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy);
      if (len < 1) return;
      const nx = -dy / len;
      const ny = dx / len;

      ctx.beginPath();
      ctx.moveTo(p1.x + nx * r1, p1.y + ny * r1);
      ctx.quadraticCurveTo(
        (p1.x + p2.x) * 0.5 + nx * ((r1 + r2) * 0.6),
        (p1.y + p2.y) * 0.5 + ny * ((r1 + r2) * 0.6),
        p2.x + nx * r2,
        p2.y + ny * r2
      );
      ctx.arc(p2.x, p2.y, r2, Math.atan2(ny, nx), Math.atan2(-ny, -nx));
      ctx.quadraticCurveTo(
        (p1.x + p2.x) * 0.5 - nx * ((r1 + r2) * 0.6),
        (p1.y + p2.y) * 0.5 - ny * ((r1 + r2) * 0.6),
        p1.x - nx * r1,
        p1.y - ny * r1
      );
      ctx.arc(p1.x, p1.y, r1, Math.atan2(-ny, -nx), Math.atan2(ny, nx));
      ctx.closePath();

      ctx.fillStyle = fill;
      ctx.fill();
      if (rimWidth > 0) {
        ctx.strokeStyle = rimColor;
        ctx.lineWidth = rimWidth;
        ctx.stroke();
      }
    };

    const drawShadowWarrior = (
      ctx,
      joints,
      cx,
      cy,
      scale,
      alpha,
      accentColor,
      secondaryColor,
      timeSec,
      isGhost = false
    ) => {
      const toScreen = (pt) => ({
        x: cx + (pt.x - 0.5) * scale,
        y: cy + (pt.y - 0.5) * scale,
      });

      const head = toScreen(joints.head);
      const neck = toScreen(joints.neck);
      const shoulderL = toScreen(joints.shoulderL);
      const shoulderR = toScreen(joints.shoulderR);
      const elbowL = toScreen(joints.elbowL);
      const wristL = toScreen(joints.wristL);
      const elbowR = toScreen(joints.elbowR);
      const wristR = toScreen(joints.wristR);
      const pelvis = toScreen(joints.pelvis);
      const hipL = toScreen(joints.hipL);
      const hipR = toScreen(joints.hipR);
      const kneeL = toScreen(joints.kneeL);
      const ankleL = toScreen(joints.ankleL);
      const footL = toScreen(joints.footL);
      const kneeR = toScreen(joints.kneeR);
      const ankleR = toScreen(joints.ankleR);
      const footR = toScreen(joints.footR);
      const sashEnd1 = toScreen(joints.sashEnd1);
      const sashEnd2 = toScreen(joints.sashEnd2);
      const strikeFocus = toScreen(joints.strikeFocus);

      const u = scale * 0.01;

      ctx.save();
      ctx.globalAlpha = alpha;

      if (!isGhost) {
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 24;
      }

      const bodyFill = isGhost ? `${accentColor}28` : 'rgba(9, 9, 13, 0.96)';
      const rimStroke = isGhost ? `${accentColor}55` : accentColor;
      const goldRim = isGhost ? `${secondaryColor}44` : secondaryColor;

      // Authentic Martial Arts Belt / Sash placed high on the body at the waist line
      const waistX = (shoulderL.x + shoulderR.x) * 0.18 + pelvis.x * 0.64;
      const waistY = (shoulderL.y + shoulderR.y) * 0.18 + pelvis.y * 0.64;

      const wave1 = Math.sin(timeSec * 4.5) * u * 2.0;
      const wave2 = Math.cos(timeSec * 3.8) * u * 2.6;

      // Primary Crimson Sash Tail
      ctx.beginPath();
      ctx.moveTo(waistX, waistY);
      ctx.quadraticCurveTo(
        sashEnd1.x + wave1,
        sashEnd1.y - wave1 * 0.5,
        sashEnd2.x + wave2,
        sashEnd2.y + wave1
      );
      ctx.strokeStyle = isGhost ? `${accentColor}33` : '#DC2626';
      ctx.lineWidth = u * 2.0;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Secondary Golden Trim Sash Ribbon
      ctx.beginPath();
      ctx.moveTo(waistX, waistY);
      ctx.quadraticCurveTo(
        sashEnd1.x - wave2 * 0.7,
        sashEnd1.y + u * 1.6,
        sashEnd2.x - wave1 * 1.1,
        sashEnd2.y + u * 2.8
      );
      ctx.strokeStyle = goldRim;
      ctx.lineWidth = u * 0.95;
      ctx.stroke();

      // Rear limbs
      drawLimb(ctx, hipR, kneeR, u * 3.3, u * 2.5, bodyFill, goldRim, 1.5);
      drawLimb(ctx, kneeR, ankleR, u * 2.5, u * 1.6, bodyFill, goldRim, 1.5);
      drawLimb(ctx, ankleR, footR, u * 1.7, u * 1.1, bodyFill, goldRim, 1.5);

      drawLimb(ctx, shoulderL, elbowL, u * 2.4, u * 1.9, bodyFill, goldRim, 1.5);
      drawLimb(ctx, elbowL, wristL, u * 1.9, u * 1.4, bodyFill, goldRim, 1.5);

      // Torso Core
      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(hipR.x, hipR.y);
      ctx.lineTo(hipL.x, hipL.y);
      ctx.closePath();
      ctx.fillStyle = bodyFill;
      ctx.fill();
      ctx.strokeStyle = rimStroke;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Lead limbs
      drawLimb(ctx, hipL, kneeL, u * 3.5, u * 2.6, bodyFill, rimStroke, 2.2);
      drawLimb(ctx, kneeL, ankleL, u * 2.6, u * 1.7, bodyFill, rimStroke, 2.2);
      drawLimb(ctx, ankleL, footL, u * 1.8, u * 1.2, bodyFill, '#FBBF24', 2.4);

      drawLimb(ctx, shoulderR, elbowR, u * 2.5, u * 1.9, bodyFill, rimStroke, 2);
      drawLimb(ctx, elbowR, wristR, u * 1.9, u * 1.5, bodyFill, '#FBBF24', 2);

      // Fists
      ctx.beginPath();
      ctx.arc(wristL.x, wristL.y, u * 1.7, 0, Math.PI * 2);
      ctx.arc(wristR.x, wristR.y, u * 1.7, 0, Math.PI * 2);
      ctx.fillStyle = bodyFill;
      ctx.fill();
      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 1.7;
      ctx.stroke();

      // Neck & Athletic Proportion Head
      drawLimb(ctx, neck, head, u * 1.6, u * 1.8, bodyFill, rimStroke, 1.5);
      ctx.beginPath();
      ctx.arc(head.x, head.y, u * 3.3, 0, Math.PI * 2);
      ctx.fillStyle = bodyFill;
      ctx.fill();
      ctx.strokeStyle = rimStroke;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      if (!isGhost) {
        // Flowing headband ribbon
        ctx.beginPath();
        ctx.moveTo(head.x, head.y - u * 1.2);
        ctx.quadraticCurveTo(
          head.x - u * 5 + wave1,
          head.y - u * 3 + wave2 * 0.5,
          head.x - u * 9 + wave2,
          head.y - u * 1 + wave1
        );
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = u * 1.1;
        ctx.stroke();

        // Kinetic strike ring
        const pulse = (Math.sin(timeSec * 5) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(strikeFocus.x, strikeFocus.y, u * (3 + pulse * 4), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = (timestamp) => {
      const timeSec = timestamp * 0.001;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const p = progressRef.current;
      const totalSegments = SCROLL_STANCES.length - 1;
      const scaled = p * totalSegments;
      const idxA = Math.min(totalSegments - 1, Math.max(0, Math.floor(scaled)));
      const idxB = Math.min(totalSegments, idxA + 1);
      const localT = scaled - idxA;

      const stanceA = SCROLL_STANCES[idxA];
      const stanceB = SCROLL_STANCES[idxB];
      const joints = interpolateJoints(stanceA, stanceB, localT);

      // Consistent stable position: Martial artist remains centered in negative space
      const isDesktop = w > 1024;
      const stageCx = isDesktop ? w * 0.50 : w * 0.50;
      const stageCy = h * 0.50;
      const stageScale = Math.min(w, h) * (isDesktop ? 0.72 : 0.65);

      // Subtle glowing eclipse backdrop
      const moonR = stageScale * 0.36;
      const moonGrad = ctx.createRadialGradient(
        stageCx,
        stageCy,
        moonR * 0.1,
        stageCx,
        stageCy,
        moonR * 1.35
      );
      moonGrad.addColorStop(0, 'rgba(220, 38, 38, 0.22)');
      moonGrad.addColorStop(0.55, 'rgba(245, 158, 11, 0.08)');
      moonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(stageCx, stageCy, moonR * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Rotating dashed geometric ring
      ctx.save();
      ctx.translate(stageCx, stageCy);
      ctx.rotate(timeSec * 0.12 + p * Math.PI * 2.5);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.14)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([10, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, moonR * 0.9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Motion-blur afterimages
      afterimagesRef.current.unshift({
        joints,
        accent: stanceA.accentColor,
        secondary: stanceA.secondaryColor,
      });
      if (afterimagesRef.current.length > 4) {
        afterimagesRef.current.pop();
      }

      for (let i = afterimagesRef.current.length - 1; i >= 1; i--) {
        const ghost = afterimagesRef.current[i];
        drawShadowWarrior(
          ctx,
          ghost.joints,
          stageCx - i * 6,
          stageCy,
          stageScale,
          0.14 / i,
          ghost.accent,
          ghost.secondary,
          timeSec,
          true
        );
      }

      // Main shadow martial artist
      drawShadowWarrior(
        ctx,
        joints,
        stageCx,
        stageCy,
        stageScale,
        isDesktop ? 0.92 : 0.50,
        stanceA.accentColor,
        stanceA.secondaryColor,
        timeSec,
        false
      );

      // Ambient dojo embers
      for (const pt of embersRef.current) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.y < 0) pt.y = 1;
        if (pt.x < 0) pt.x = 1;
        if (pt.x > 1) pt.x = 0;

        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.gold
          ? `rgba(251, 191, 36, ${pt.alpha})`
          : `rgba(239, 68, 68, ${pt.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}

// ============================================================================
// 15 AUTHENTIC THRITHALA ACADEMY PHOTOS (ALL REAL, ZERO DUPLICATES)
// ============================================================================
const ALL_ACADEMY_PHOTOS = [
  { id: 'p01', src: 'traditional-flying-kick.jpg', span: 'col-span-1 md:col-span-2 md:row-span-2', imgClass: 'object-cover object-top' },
  { id: 'p02', src: 'lineage-vertical-split.png', span: 'col-span-1 md:col-span-1 md:row-span-2' },
  { id: 'p03', src: 'riverbank-duel-kicks.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p04', src: 'traditional-staff-stance.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p05', src: 'shaolin-forms-duel.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p06', src: 'outdoor-high-kick-partner.jpg', span: 'col-span-1 md:col-span-1 md:row-span-2' },
  { id: 'p07', src: 'dragon-banner-team.jpg', span: 'col-span-1 md:col-span-2 md:row-span-1' },
  { id: 'p08', src: 'belt-grading-ceremony.jpg', span: 'col-span-1 md:col-span-2 md:row-span-1' },
  { id: 'p09', src: 'aerial-side-kick-grass.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p10', src: 'traditional-flying-kick.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1', imgClass: 'object-cover object-top' },
  { id: 'p11', src: 'indoor-acrobatic-stunt.png', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p12', src: 'dojo-close-combat-drill.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p13', src: 'disciplines-side-kick.png', span: 'col-span-1 md:col-span-2 md:row-span-1' },
  { id: 'p14', src: 'gallery-stage-acrobatics.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p15', src: 'schedule-dojo-conditioning.jpg', span: 'col-span-1 md:col-span-1 md:row-span-1' },
];

// ============================================================================
// ACADEMY TRAINING DISCIPLINES (Kung Fu, Wushu, Boxing, Kickboxing, MMA)
// ============================================================================
const PROGRAMS = [
  {
    id: 'shaolin',
    title: 'Traditional Shaolin Kung Fu',
    icon: FlameIcon,
    color: 'from-red-600 to-amber-500',
    photo: 'traditional-flying-kick.jpg',
    description:
      'Authentic traditional forms, deep horse stances, weapon routines, and internal energy conditioning.',
    highlights: [
      'Foundational Stances & Coordination',
      'Staff, Sword & Traditional Weapons',
      'Mental Focus, Discipline & Calm',
    ],
  },
  {
    id: 'wushu',
    title: 'Competitive Wushu Training',
    icon: Award,
    color: 'from-amber-500 to-red-600',
    photo: 'outdoor-high-kick-partner.jpg',
    description:
      '180° vertical split kicks, aerial jumps, dynamic tournament routines, and competitive Sanda combat.',
    highlights: [
      '180° High Split Flexibility',
      'District & State Championship Prep',
      'Competitive Sanda Full-Contact',
    ],
  },
  {
    id: 'boxing',
    title: 'Boxing Academy & Striking Gym',
    icon: Zap,
    color: 'from-red-600 to-orange-500',
    photo: 'dojo-close-combat-drill.jpg',
    description:
      'Precision footwork, slip-and-counter head movement, crisp punch combinations, and heavy bag stamina.',
    highlights: [
      'Rhythm, Angles & Head Movement',
      'Heavy Bag & Mitt Conditioning',
      'Cardiovascular Boxing Stamina',
    ],
  },
  {
    id: 'kickboxing',
    title: 'Kickboxing & Striking',
    icon: Swords,
    color: 'from-rose-600 to-amber-500',
    photo: 'aerial-side-kick-grass.jpg',
    description:
      'Crushing roundhouse kicks, explosive combinations, footwork agility, and high-calorie metabolic conditioning.',
    highlights: [
      'Explosive Striking & Combinations',
      'Deep Core & Leg Strengthening',
      'High-Calorie Fat Burn Workout',
    ],
  },
  {
    id: 'mma',
    title: 'MMA & Practical Self-Defense',
    icon: Shield,
    color: 'from-emerald-600 to-teal-500',
    photo: 'disciplines-side-kick.png',
    description:
      'Takedown defense, grapple escapes, situational awareness, and effective practical self-defense for all ages.',
    highlights: [
      'Women’s Safety & Escape Techniques',
      'Ground Recovery & Takedown Defense',
      'Confidence in Stressful Situations',
    ],
  },
  {
    id: 'kids',
    title: 'Kids Martial Arts & Acrobatics',
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    photo: 'indoor-acrobatic-stunt.png',
    description:
      'Inverted acrobatics, handstands, active physical fitness, anti-bullying confidence, and mutual respect.',
    highlights: [
      'Handstands, Flips & Flexibility',
      'Screen-Free Energetic Athletics',
      'Discipline, Focus & Respect',
    ],
  },
];

function FlameIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

// ============================================================================
// VERIFIED GOOGLE REVIEWS (Thrithala Chamber • 5.0 ★ Rating)
// ============================================================================
const REVIEWS = [
  {
    name: 'Hadhiya P',
    role: 'Student • Thrithala Chamber',
    text: 'One of the best class. Master is so supportive and encourages every student to reach their full potential.',
  },
  {
    name: 'Vipindas Pulikkathara',
    role: 'Thrithala Resident • Google Review',
    text: 'Superb Teaching, Good facilities, A place to build mind and soul akin for the budding generation.',
  },
  {
    name: 'Praveen Parayil',
    role: 'Academy Member • Google Review',
    text: 'Strengthening Mind and Body simultaneously. The discipline and workout energy here in Thrithala are unmatched.',
  },
  {
    name: 'MUHAMMED RAYEES K T',
    role: 'Student • Google Review',
    text: 'Best level teaching with individual attention for both beginners and advanced championship athletes.',
  },
  {
    name: 'Athul Krishna',
    role: 'Black Belt Student • Google Review',
    text: 'Best martial arts academy and best teachers. Proud to train under certified Black Belt masters.',
  },
  {
    name: 'Varsha Deepesh',
    role: 'Parent • Google Review',
    text: 'Good teaching and a very safe, motivating environment for kids, girls, and youth to master martial arts.',
  },
];

// ============================================================================
// MAIN LANDING PAGE COMPONENT (100% Thrithala Branch Focus)
// ============================================================================
export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.0005,
  });

  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('Youth & Adults (15+ yrs)');
  const [selectedTiming, setSelectedTiming] = useState('Evening Batch (6:30 PM – 8:30 PM)');

  const handleUnifiedWhatsAppEnquiry = (e) => {
    e.preventDefault();
    const intro = studentName.trim()
      ? `Hello Master, my name is *${studentName.trim()}*.`
      : `Hello Master,`;

    const message = `${intro} I would like to enquire about joining *Shaolin Kung-fu Chamber of Fitness* in *Thrithala*.\n\n• *Category*: ${selectedAgeGroup}\n• *Preferred Timing*: ${selectedTiming}\n\nPlease share admission details and training schedule.`;

    openWhatsApp(CONTACT.phone, message);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-red-600 selection:text-white overflow-x-hidden relative font-sans">
      {/* Background Continuous Scroll-Synchronized Shadow Warrior Engine */}
      <ScrollSyncedShadowCanvas scrollProgress={smoothScroll} />

      {/* Navigation Header with Official Academy Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-amber-500/50 shadow-[0_0_20px_rgba(220,38,38,0.45)] group-hover:scale-105 transition-transform shrink-0">
              <img
                src={resolveImageSrc('logo.png')}
                alt="Shaolin Kung-Fu Chamber of Fitness Official Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-wider text-xs sm:text-base text-white uppercase">
                  Shaolin Kung-Fu
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  5.0 ★ Thrithala
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 tracking-wide line-clamp-1">
                Chamber of Fitness • Palakkad – Ponnani Rd, Thrithala
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-300">
            <a href="#lineage" className="hover:text-amber-400 transition-colors">
              About
            </a>
            <a href="#disciplines" className="hover:text-amber-400 transition-colors">
              Disciplines
            </a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">
              Gallery
            </a>
            <a href="#schedule" className="hover:text-amber-400 transition-colors">
              Class Schedule
            </a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">
              Reviews
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all shrink-0 cursor-pointer"
            >
              <span>Join Chamber</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content (Transparent Over Motion Background) */}
      <main className="relative z-10 pt-20 sm:pt-28 pb-24">
        {/* ===================================================================
            PAUSE POINT 0: HERO (Airborne Flying Kick)
            Left: Typography & CTAs | Center: Motion Shadow Warrior | Right: Matching Photo Fitted
        ==================================================================== */}
        <section
          id="hero"
          className="scroll-mt-24 min-h-[92vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-6 sm:py-16"
        >
          <div
            id="pause-hero"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Column: Text & CTAs (Transparent, No Heavy Tiles) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/35 bg-transparent"
              >
                <span className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0 ★ Google Rating (130+ Thrithala Reviews)
                </span>
                <span className="hidden sm:inline text-zinc-600">•</span>
                <span className="text-[11px] sm:text-xs text-zinc-300 font-medium">
                  Thrithala, Kerala
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-red-500 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white p-0.5 border border-amber-500/40 shadow-[0_0_10px_rgba(220,38,38,0.4)] shrink-0">
                    <img
                      src={resolveImageSrc('logo.png')}
                      alt="Shaolin Kung-Fu Official Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span>SHAOLIN KUNG-FU CHAMBER OF FITNESS • THRITHALA</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  MASTER YOUR{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">
                    BODY, MIND
                  </span>{' '}
                  & SPIRIT.
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed"
              >
                Located on Palakkad–Ponnani Road in Thrithala, our academy trains
                kids, youth, and adults in authentic Shaolin Kung Fu, Competitive
                Wushu, Boxing, Kickboxing, MMA, and practical
                self-defense.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
              >
                <a
                  href="#enquiry"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-black text-sm sm:text-base shadow-[0_0_30px_rgba(220,38,38,0.45)] hover:shadow-[0_0_45px_rgba(245,158,11,0.65)] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Enquire on WhatsApp or Call</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-transparent hover:bg-white/5 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>View Academy Photos</span>
                </a>
              </motion.div>

              {/* Key Stats Bar with 100% Mat-Covered Arena (Transparent) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 max-w-lg">
                <div className="p-3 sm:p-4 rounded-2xl border border-white/15 bg-transparent text-center sm:text-left">
                  <div className="text-xl sm:text-3xl font-black text-amber-400">
                    5.0 ★
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 font-medium mt-0.5">
                    130+ Reviews
                  </div>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl border border-white/15 bg-transparent text-center sm:text-left">
                  <div className="text-xl sm:text-3xl font-black text-red-500">
                    16+
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 font-medium mt-0.5">
                    Black Belts
                  </div>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl border border-white/15 bg-transparent text-center sm:text-left">
                  <div className="text-xl sm:text-3xl font-black text-white">
                    100% Mat
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 font-medium mt-0.5">
                    Covered Arena
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: Open Corridor where Shadow Warrior performs */}
            <div className="hidden lg:block lg:col-span-3 min-h-[400px] pointer-events-none" />

            {/* Right Column: Matching Real Photo (Cropped and Fitted into Frame) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightboxPhoto('traditional-flying-kick.jpg')}
                className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-zinc-950/80 shadow-[0_0_50px_rgba(220,38,38,0.3)] cursor-pointer group aspect-[4/3] p-1.5 flex items-center justify-center"
              >
                <img
                  src={resolveImageSrc('hero-dive-roll.webp')}
                  alt="Shaolin Kung-Fu Thrithala student mid-air dive by the riverside pillars"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            TRANSITION 1: ACADEMY ETHOS (Pure Transparent Wording, Zero Tiles)
        ==================================================================== */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pointer-events-auto">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Traditional Chinese Martial Arts • Shaolin Chamber Thrithala
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Rooted in Ancient Discipline. Built for Modern Fitness.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Every stance taught at our Thrithala chamber is rooted in centuries-old Shaolin
            and Wushu traditions, passed down through certified Grandmaster lineages.
            Our athletes develop explosive speed, joint flexibility, and razor-sharp
            defensive focus from day one.
          </p>
        </section>

        {/* ===================================================================
            PAUSE POINT 1: LINEAGE & HERITAGE (Vertical Split Extension)
            Transparent Typography | Center Motion Warrior | Right: Matching 180° Split Photo
        ==================================================================== */}
        <section
          id="lineage"
          className="scroll-mt-24 py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            id="pause-lineage"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Column: Transparent Wording without Tiles */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-5 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest bg-transparent">
                <Award className="w-3.5 h-3.5" /> Proven Martial Arts Lineage
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                BUILT ON DISCIPLINE,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                  FITNESS & EXCELLENCE
                </span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Shaolin Kung-fu Chamber of Fitness was established in Thrithala
                with a clear mission: to mould students in Palakkad toward peak
                physical health, mental resilience, and authentic martial arts
                skill. Welcoming students from{' '}
                <strong className="text-white">
                  Thrithala, Pattambi, Muthuthala, Koottanad, Kumbidi, and
                  Perumpilavu
                </strong>
                .
              </p>

              <div className="space-y-4 pt-2">
                <div className="border-l-2 border-amber-500/80 pl-4 space-y-1">
                  <div className="text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider">
                    Grandmaster Sukumar Lineage
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Certified black belt masters trained under Grandmaster Sukumar in Chennai.
                  </p>
                </div>
                <div className="border-l-2 border-red-500/80 pl-4 space-y-1">
                  <div className="text-red-400 font-black text-xs sm:text-sm uppercase tracking-wider">
                    District & State Medalists
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Consistent podium athletes across Wushu, Boxing, and Kickboxing tournaments.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Center Column: Open Corridor */}
            <div className="hidden lg:block lg:col-span-3 min-h-[400px] pointer-events-none" />

            {/* Right Column: Matching Real Photo (Vertical Split Extension) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightboxPhoto('lineage-vertical-split.png')}
                className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl cursor-pointer group aspect-[3/4]"
              >
                <img
                  src={resolveImageSrc('lineage-vertical-split.png')}
                  alt="180 Degree Vertical Split Extension in Traditional Uniform"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            TRANSITION 2: DYNAMIC STRIKING (Pure Transparent Wording, Zero Tiles)
        ==================================================================== */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pointer-events-auto">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Dynamic Striking & Acrobatics • Full Mat Conditioning
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Every Strike Forged with Precision and Control
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            From heavy bag striking and footwork agility to 180° flexibility extensions
            and full-contact tournament sparring, each discipline is engineered to
            build functional power and unwavering self-confidence.
          </p>
        </section>

        {/* ===================================================================
            PAUSE POINT 2: DISCIPLINES (Combat Side Kick)
            Transparent Overview | Center Motion Warrior | Right: Matching Riverbank Duel Kicks
        ==================================================================== */}
        <section
          id="disciplines"
          className="scroll-mt-24 py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            id="pause-disciplines"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-10"
          >
            {/* Left Column: Transparent Overview without Tiles */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-widest bg-transparent">
                <Swords className="w-3.5 h-3.5" /> Combat & Fitness Curriculum
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                OUR TRAINING{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                  DISCIPLINES
                </span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Every student in our Thrithala chamber receives structured coaching
                across striking, flexibility, acrobatics, and practical self-defense.
                Tailored for kids, youth, women, and adults.
              </p>
            </div>

            {/* Center Column: Open Corridor */}
            <div className="hidden lg:block lg:col-span-3 min-h-[360px] pointer-events-none" />

            {/* Right Column: Matching Real Photo (Side Kick Duel) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightboxPhoto('riverbank-duel-kicks.jpg')}
                className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl cursor-pointer group aspect-[4/3]"
              >
                <img
                  src={resolveImageSrc('riverbank-duel-kicks.jpg')}
                  alt="Bharathapuzha Riverbank Combat Sparring Kick Duel"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>

          {/* 6 Clean Discipline Cards (Pure Photos, Zero Text Overlays) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-4">
            {PROGRAMS.map((prog, index) => {
              const IconComp = prog.icon;
              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-3xl bg-zinc-950/60 border border-white/10 hover:border-amber-500/40 overflow-hidden backdrop-blur-md flex flex-col justify-between transition-all shadow-xl cursor-pointer"
                  onClick={() => setLightboxPhoto(prog.photo)}
                >
                  <div>
                    {/* Action Photo (Pure Photo, Zero Text Overlays) */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-950">
                      <img
                        src={resolveImageSrc(prog.photo)}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-2.5">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${prog.color} p-0.5 shrink-0`}
                        >
                          <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                            <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                          {prog.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {prog.description}
                      </p>

                      <ul className="mt-4 pt-4 border-t border-white/10 space-y-1.5 sm:space-y-2">
                        {prog.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs font-semibold text-zinc-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            TRANSITION 3: REAL-WORLD MARTIAL ARTS (Transparent Wording, Zero Tiles)
        ==================================================================== */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pointer-events-auto">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Outdoor Camps & Dojo Demonstration Events
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Moments Captured Across Thrithala
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Every training camp on the sandbanks of Bharathapuzha, every sash grading
            milestone inside the dojo, and every high-flying demonstration stage routine
            is a testament to the grit of our athletes.
          </p>
        </section>

        {/* ===================================================================
            PAUSE POINT 3: GALLERY (Inverted Acrobatics)
            Transparent Overview | Center Motion Warrior | Right: Matching Inverted Stunt
        ==================================================================== */}
        <section
          id="gallery"
          className="scroll-mt-24 py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            id="pause-gallery"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-10"
          >
            {/* Left Column: Transparent Overview without Tiles */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest bg-transparent">
                <Camera className="w-3.5 h-3.5" /> Verified Thrithala Academy Gallery
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                AUTHENTIC{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                  TRAINING MOMENTS
                </span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Real moments captured across our outdoor conditioning camps along
                the Bharathapuzha river, stage demonstrations, and indoor dojo
                sessions in Thrithala.
              </p>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-xs font-bold text-amber-400 border border-amber-500/40 transition-all cursor-pointer"
              >
                <span>View All 112+ Photos on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Center Column: Open Corridor */}
            <div className="hidden lg:block lg:col-span-3 min-h-[360px] pointer-events-none" />

            {/* Right Column: Matching Real Photo (Inverted Acrobatics) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightboxPhoto('indoor-acrobatic-stunt.png')}
                className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl cursor-pointer group aspect-[4/3]"
              >
                <img
                  src={resolveImageSrc('indoor-acrobatic-stunt.png')}
                  alt="Thrithala Academy Inverted Acrobatic Partner Stunt"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>

          {/* Full Bento Photo Grid (15 Real Photos, Zero Text Explanations) */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] sm:auto-rows-[260px] gap-3 sm:gap-4">
            {ALL_ACADEMY_PHOTOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.025, transition: { duration: 0.25 } }}
                onClick={() => setLightboxPhoto(item.src)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 cursor-pointer shadow-xl ${item.span}`}
              >
                <img
                  src={resolveImageSrc(item.src)}
                  alt="Shaolin Kung-Fu Thrithala Chamber Action"
                  className={`w-full h-full ${item.imgClass || 'object-cover'} group-hover:scale-108 transition-transform duration-700 ease-out`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            TRANSITION 4: WEEKLY TRAINING ROUTINE (Transparent Wording, Zero Tiles)
        ==================================================================== */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pointer-events-auto">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Safe, Structured & Encouraging Environment
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Consistent Training for Lifelong Fitness
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Whether you are enrolling your child for agility and focus, training for
            state-level Wushu combat, or seeking practical self-defense, our Thrithala
            facility offers an inclusive dojo culture where every member progresses at their pace.
          </p>
        </section>

        {/* ===================================================================
            PAUSE POINT 4: SCHEDULE & VENUE (Low Conditioning Stance)
            Transparent Overview without Tiles | Center Motion Warrior | Right: Matching Dojo Photo
        ==================================================================== */}
        <section
          id="schedule"
          className="scroll-mt-24 py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            id="pause-schedule"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Column: Transparent Schedule without Tiles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider">
                  Thrithala Main Chamber
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0 ★ (130+ Reviews)
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-white">
                Thrithala Chamber of Fitness
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </p>

              {/* Transparent Schedule Layout (Zero Tiles) */}
              <div className="border-t border-b border-white/15 py-4 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Regular Training Hours
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl border border-white/10 bg-transparent">
                    <div className="font-bold text-white">Mon, Wed & Saturday</div>
                    <div className="text-emerald-400 font-semibold mt-0.5">
                      6:30 PM – 8:30 PM
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-transparent">
                    <div className="font-bold text-white">Sunday Morning</div>
                    <div className="text-amber-400 font-semibold mt-0.5">
                      8:30 AM – 10:30 AM
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-300">
                <span>Direct: {CONTACT.displayPhone}</span>
                <a
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-bold"
                >
                  <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
                </a>
              </div>
            </motion.div>

            {/* Center Column: Open Corridor */}
            <div className="hidden lg:block lg:col-span-3 min-h-[400px] pointer-events-none" />

            {/* Right Column: Matching Real Photo (Dojo Mat Conditioning) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightboxPhoto('schedule-dojo-conditioning.jpg')}
                className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl cursor-pointer group aspect-[4/3]"
              >
                <img
                  src={resolveImageSrc('schedule-dojo-conditioning.jpg')}
                  alt="Thrithala Dojo Mat Conditioning"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            TRANSITION 5: VERIFIED GOOGLE REVIEWS (Transparent Minimal Cards)
        ==================================================================== */}
        <section
          id="reviews"
          className="scroll-mt-24 py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3 bg-transparent">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> 100% 5.0 ★ Rating on Google
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              STUDENT &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                PARENT REVIEWS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {REVIEWS.map((rev, i) => (
              <motion.div
                key={rev.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 p-5 sm:p-6 bg-zinc-950/40 backdrop-blur-sm flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    “{rev.text}”
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xs sm:text-sm shrink-0">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{rev.name}</div>
                    <div className="text-[10px] text-zinc-400">{rev.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            PAUSE POINT 5: ADMISSION ENQUIRY (Master Salute)
            Transparent Form Layout | Center Motion Warrior | Right: Matching Shaolin Forms Photo
        ==================================================================== */}
        <section
          id="enquiry"
          className="scroll-mt-24 py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            id="pause-enquiry"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Column: Transparent Admission Form without Heavy Tiles */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-4"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 border border-amber-500/40 shadow-[0_0_12px_rgba(220,38,38,0.4)] shrink-0">
                    <img
                      src={resolveImageSrc('logo.png')}
                      alt="Shaolin Kung-Fu Official Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-transparent">
                    Thrithala Chamber Admission
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                  JOIN THE CHAMBER TODAY
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                  Have questions about class timings, trial sessions, or batch
                  fees? Reach out directly to our Master on WhatsApp or phone call.
                </p>
              </div>

              <form onSubmit={handleUnifiedWhatsAppEnquiry} className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter name..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-white/20 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Age Category
                    </label>
                    <select
                      value={selectedAgeGroup}
                      onChange={(e) => setSelectedAgeGroup(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950/80 border border-white/20 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Kids Batch (5 – 12 yrs)">Kids Batch (5 – 12 yrs)</option>
                      <option value="Teens Batch (13 – 17 yrs)">Teens Batch (13 – 17 yrs)</option>
                      <option value="Youth & Adults (18+ yrs)">Youth & Adults (18+ yrs)</option>
                      <option value="Women's Self-Defense">Women's Self-Defense</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Preferred Batch
                    </label>
                    <select
                      value={selectedTiming}
                      onChange={(e) => setSelectedTiming(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950/80 border border-white/20 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Evening (6:30 PM – 8:30 PM)">Evening (6:30 PM – 8:30 PM)</option>
                      <option value="Sunday (8:30 AM – 10:30 AM)">Sunday (8:30 AM – 10:30 AM)</option>
                      <option value="Trial Session">Trial Session</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-white font-black text-sm shadow-[0_0_25px_rgba(16,185,129,0.45)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>WhatsApp Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => callNumber(CONTACT.phone)}
                    className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call Now</span>
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Center Column: Open Corridor */}
            <div className="hidden lg:block lg:col-span-3 min-h-[400px] pointer-events-none" />

            {/* Right Column: Matching Real Photo (Shaolin Forms Duel) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightboxPhoto('shaolin-forms-duel.jpg')}
                className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl cursor-pointer group aspect-[4/3]"
              >
                <img
                  src={resolveImageSrc('shaolin-forms-duel.jpg')}
                  alt="Traditional Shaolin Forms Salute and Discipline"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal (Pure Photo, Zero Overlay Text) */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-zinc-950 border border-white/20 shadow-2xl flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer border border-white/20"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full h-full max-h-[85vh] flex items-center justify-center p-2 sm:p-4 bg-black">
                <img
                  src={resolveImageSrc(lightboxPhoto)}
                  alt="Shaolin Kung-Fu Academy Thrithala Full View"
                  className="w-auto h-auto max-w-full max-h-[82vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (100% Thrithala Focus with Official Logo) */}
      <footer className="relative z-10 border-t border-white/10 bg-black/90 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 border border-amber-500/40 shadow-[0_0_15px_rgba(220,38,38,0.4)] shrink-0">
              <img
                src={resolveImageSrc('logo.png')}
                alt="Shaolin Kung-Fu Chamber of Fitness Official Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-white uppercase">
                Shaolin Kung-fu Chamber of Fitness
              </div>
              <div className="text-[10px] sm:text-xs text-zinc-500">
                Palakkad – Ponnani Rd, Thrithala, Kerala 679534
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <a
              href={`tel:+${CONTACT.phone}`}
              className="hover:text-white transition-colors"
            >
              Direct: {CONTACT.displayPhone}
            </a>
            <span>•</span>
            <a
              href={CONTACT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline"
            >
              Google Maps Location
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
