import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
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
// 7 SCROLL-SYNCHRONIZED KEYFRAME STANCES (Normalized coordinates 0 to 1)
// 0: Airborne Dive (Hero)
// 1: Vertical Split Extension (Lineage)
// 2: Combat Side Kick (Disciplines)
// 3: Horse Stance Palm Guard (Gallery)
// 4: Low Conditioning Stance (Schedule)
// 5: Bow Stance Palm Strike (Enquiry)
// 6: Closing Salute, feet together, palms joined, head bowed (bottom of page)
// ============================================================================
const SCROLL_STANCES = [
  {
    id: 0,
    section: 'Hero',
    label: 'Airborne Dive',
    accentColor: '#EF4444',
    secondaryColor: '#F59E0B',
    joints: {
      head: { x: 0.66, y: 0.50 },
      neck: { x: 0.62, y: 0.47 },
      shoulderL: { x: 0.58, y: 0.43 },
      shoulderR: { x: 0.60, y: 0.48 },
      elbowL: { x: 0.53, y: 0.33 },
      wristL: { x: 0.50, y: 0.22 },
      elbowR: { x: 0.63, y: 0.55 },
      wristR: { x: 0.68, y: 0.56 },
      pelvis: { x: 0.42, y: 0.45 },
      hipL: { x: 0.43, y: 0.42 },
      hipR: { x: 0.42, y: 0.47 },
      kneeL: { x: 0.32, y: 0.36 },
      ankleL: { x: 0.24, y: 0.26 },
      footL: { x: 0.20, y: 0.24 },
      kneeR: { x: 0.29, y: 0.46 },
      ankleR: { x: 0.17, y: 0.47 },
      footR: { x: 0.12, y: 0.45 },
      sashEnd1: { x: 0.40, y: 0.56 },
      sashEnd2: { x: 0.34, y: 0.62 },
      strikeFocus: { x: 0.68, y: 0.56 },
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
    label: 'Horse Stance Palm Guard',
    accentColor: '#EF4444',
    secondaryColor: '#FBBF24',
    joints: {
      head: { x: 0.50, y: 0.30 },
      neck: { x: 0.50, y: 0.36 },
      shoulderL: { x: 0.42, y: 0.39 },
      shoulderR: { x: 0.58, y: 0.39 },
      elbowL: { x: 0.37, y: 0.50 },
      wristL: { x: 0.43, y: 0.45 },
      elbowR: { x: 0.63, y: 0.50 },
      wristR: { x: 0.58, y: 0.46 },
      pelvis: { x: 0.50, y: 0.60 },
      hipL: { x: 0.45, y: 0.60 },
      hipR: { x: 0.55, y: 0.60 },
      kneeL: { x: 0.35, y: 0.72 },
      ankleL: { x: 0.33, y: 0.88 },
      footL: { x: 0.30, y: 0.89 },
      kneeR: { x: 0.65, y: 0.72 },
      ankleR: { x: 0.67, y: 0.88 },
      footR: { x: 0.70, y: 0.89 },
      sashEnd1: { x: 0.51, y: 0.70 },
      sashEnd2: { x: 0.52, y: 0.78 },
      strikeFocus: { x: 0.50, y: 0.45 },
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
    label: 'Bow Stance Palm Strike',
    accentColor: '#F59E0B',
    secondaryColor: '#EF4444',
    joints: {
      head: { x: 0.56, y: 0.28 },
      neck: { x: 0.55, y: 0.34 },
      shoulderL: { x: 0.48, y: 0.37 },
      shoulderR: { x: 0.62, y: 0.37 },
      elbowL: { x: 0.38, y: 0.37 },
      wristL: { x: 0.28, y: 0.33 },
      elbowR: { x: 0.68, y: 0.33 },
      wristR: { x: 0.62, y: 0.30 },
      pelvis: { x: 0.56, y: 0.60 },
      hipL: { x: 0.52, y: 0.60 },
      hipR: { x: 0.60, y: 0.60 },
      kneeL: { x: 0.43, y: 0.72 },
      ankleL: { x: 0.32, y: 0.84 },
      footL: { x: 0.28, y: 0.85 },
      kneeR: { x: 0.68, y: 0.72 },
      ankleR: { x: 0.70, y: 0.85 },
      footR: { x: 0.74, y: 0.86 },
      sashEnd1: { x: 0.57, y: 0.70 },
      sashEnd2: { x: 0.58, y: 0.80 },
      strikeFocus: { x: 0.28, y: 0.33 },
    },
  },
  {
    id: 6,
    section: 'Page End',
    label: 'Closing Salute',
    accentColor: '#F59E0B',
    secondaryColor: '#EF4444',
    joints: {
      head: { x: 0.50, y: 0.22 },
      neck: { x: 0.50, y: 0.28 },
      shoulderL: { x: 0.42, y: 0.31 },
      shoulderR: { x: 0.58, y: 0.31 },
      elbowL: { x: 0.39, y: 0.42 },
      wristL: { x: 0.49, y: 0.33 },
      elbowR: { x: 0.61, y: 0.42 },
      wristR: { x: 0.51, y: 0.33 },
      pelvis: { x: 0.50, y: 0.55 },
      hipL: { x: 0.46, y: 0.55 },
      hipR: { x: 0.54, y: 0.55 },
      kneeL: { x: 0.47, y: 0.71 },
      ankleL: { x: 0.48, y: 0.86 },
      footL: { x: 0.47, y: 0.88 },
      kneeR: { x: 0.53, y: 0.71 },
      ankleR: { x: 0.52, y: 0.86 },
      footR: { x: 0.53, y: 0.88 },
      sashEnd1: { x: 0.48, y: 0.63 },
      sashEnd2: { x: 0.49, y: 0.70 },
      strikeFocus: { x: 0.50, y: 0.33 },
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
// Scroll position -> stance index (float). Inside a section's hold zone the
// index is a whole number, so the warrior locks onto that section's pose.
const stanceForScroll = (y, zones) => {
  if (!zones.length) return 0;
  if (y <= zones[0].end) return 0;
  for (let i = 0; i < zones.length - 1; i++) {
    const a = zones[i];
    const b = zones[i + 1];
    if (y <= a.end) return i;
    if (y < b.start) return i + (y - a.end) / (b.start - a.end);
  }
  return zones.length - 1;
};

const PAUSE_IDS = ['hero', 'lineage', 'disciplines', 'gallery', 'schedule', 'enquiry'];

function ScrollSyncedShadowCanvas() {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const afterimagesRef = useRef([]);
  const embersRef = useRef([]);

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

    let dpr = 1;
    // Size from the canvas box (100lvh) so mobile URL-bar show/hide never rescales the warrior
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Hold zone per section: the scroll range where its pause block sits around viewport centre
    let zones = [];
    const measure = () => {
      const vh = window.innerHeight;
      const maxY = document.documentElement.scrollHeight - vh;
      zones = PAUSE_IDS.map((id) => document.getElementById(`pause-${id}`))
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          const centre = r.top + window.scrollY + r.height / 2 - vh / 2;
          const half = Math.min(r.height * 0.35, vh * 0.3);
          return {
            start: Math.max(0, Math.min(maxY, centre - half)),
            end: Math.max(0, Math.min(maxY, centre + half)),
          };
        });
      // Closing salute owns the last stretch of scroll; earlier holds end before it
      const finalStart = maxY - vh * 0.15;
      const limit = finalStart - vh * 0.2;
      zones = zones.map((z) => ({ start: Math.min(z.start, limit), end: Math.min(z.end, limit) }));
      zones.push({ start: finalStart, end: maxY });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

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

      const totalSegments = SCROLL_STANCES.length - 1;
      const target = stanceForScroll(window.scrollY, zones);
      // Ease toward the target pose; snap when close so held poses are perfectly still
      const diff = target - progressRef.current;
      progressRef.current = Math.abs(diff) < 0.001 ? target : progressRef.current + diff * 0.12;
      const scaled = progressRef.current;
      const p = scaled / totalSegments;
      const idxA = Math.min(totalSegments - 1, Math.max(0, Math.floor(scaled)));
      const idxB = Math.min(totalSegments, idxA + 1);
      const localT = scaled - idxA;

      const stanceA = SCROLL_STANCES[idxA];
      const stanceB = SCROLL_STANCES[idxB];
      const joints = interpolateJoints(stanceA, stanceB, localT);

      // Consistent stable position: Martial artist remains centered in negative space
      const isDesktop = w / dpr > 1024;
      const stageCx = w * 0.5;
      const stageCy = h * 0.5;
      const stageScale = Math.min(w, h) * (isDesktop ? 0.72 : 0.92);

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
        isDesktop ? 0.92 : 0.85,
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
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0 w-full h-lvh"
    />
  );
}

// ============================================================================
// 13 AUTHENTIC THRITHALA ACADEMY PHOTOS (ALL REAL, ZERO DUPLICATES)
// ============================================================================
const ALL_ACADEMY_PHOTOS = [
  { id: 'p01', src: 'traditional-flying-kick.jpg', alt: 'Kung fu student in a lavender Shaolin uniform performing a flying kick, Thrithala', span: 'col-span-1 md:col-span-2 md:row-span-2', imgClass: 'object-cover object-top' },
  { id: 'p02', src: 'lineage-vertical-split.png', alt: 'Wushu student holding a standing vertical split kick outdoors in Thrithala', span: 'col-span-1 md:col-span-1 md:row-span-2' },
  { id: 'p03', src: 'riverbank-duel-kicks.jpg', alt: 'Two martial arts students trading high kicks on the Bharathapuzha riverbank, Thrithala', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p04', src: 'traditional-staff-stance.jpg', alt: 'Kung fu student in a low stance with a bamboo staff on a hilltop near Thrithala', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p05', src: 'shaolin-forms-duel.jpg', alt: 'Two black belt students in Shaolin uniforms practising kung fu forms outdoors', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p06', src: 'outdoor-high-kick-partner.jpg', alt: 'Kickboxing partner drill with a high kick at an outdoor training camp in Thrithala', span: 'col-span-1 md:col-span-1 md:row-span-2' },
  { id: 'p07', src: 'dragon-banner-team.jpg', alt: 'Shaolin Kung-Fu Chamber of Fitness instructors and black belt team in front of the dragon banner', span: 'col-span-1 md:col-span-2 md:row-span-1' },
  { id: 'p08', src: 'belt-grading-ceremony.jpg', alt: 'Kids and adult students with certificates at a kung fu belt grading ceremony in Thrithala', span: 'col-span-1 md:col-span-2 md:row-span-1' },
  { id: 'p09', src: 'aerial-side-kick-grass.jpg', alt: 'Kung fu student mid-air performing a flying side kick on a grass field', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p12', src: 'dojo-close-combat-drill.jpg', alt: 'Self-defense close combat drill with girls and boys practising blocks in the Thrithala dojo', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p14', src: 'gallery-stage-acrobatics.jpg', alt: 'Kids martial arts stage demonstration with a handstand at a Thrithala event', span: 'col-span-1 md:col-span-1 md:row-span-1' },
  { id: 'p13', src: 'disciplines-side-kick.png', alt: 'Row of martial arts students holding side kicks on the Bharathapuzha riverbank', span: 'col-span-1 md:col-span-2 md:row-span-1' },
  { id: 'p15', src: 'schedule-dojo-conditioning.jpg', alt: 'Students doing low-stance conditioning on the mats inside the Thrithala martial arts chamber', span: 'col-span-1 md:col-span-1 md:row-span-1' },
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
    photoClass: 'object-[center_8%]',
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
// FAQ (rendered on the page AND emitted as FAQPage JSON-LD from the same data)
// Plain-text answers so search engines and AI assistants can quote them directly.
// ============================================================================
const FAQS = [
  {
    q: 'Where is the martial arts class in Thrithala?',
    a: 'Shaolin Kung-Fu Chamber of Fitness is on Palakkad – Ponnani Road, Thrithala, Kerala 679534, near the Bharathapuzha riverbanks in Palakkad district. Call or WhatsApp +91 90486 81719 for directions.',
  },
  {
    q: 'Which martial arts can I learn here?',
    a: 'We teach six programs: Traditional Shaolin Kung Fu, Competitive Wushu (including Sanda), Boxing, Kickboxing, MMA & practical self-defense, and Kids Martial Arts & Acrobatics.',
  },
  {
    q: 'What are the class timings?',
    a: 'Regular classes run on Monday, Wednesday and Saturday from 6:30 PM to 8:30 PM, and on Sunday morning from 8:30 AM to 10:30 AM.',
  },
  {
    q: 'What age can my child start kung fu?',
    a: 'Children can join the Kids Batch from 5 years of age. There are separate batches for kids (5–12 years), teens (13–17 years), and youth & adults (18+ years).',
  },
  {
    q: 'Are there self-defense classes for women and girls?',
    a: 'Yes. We run a dedicated Women’s Self-Defense batch covering escape techniques, takedown defense, ground recovery, and confidence in stressful situations.',
  },
  {
    q: 'Do you teach karate?',
    a: 'We teach Shaolin Kung Fu and Wushu, which are Chinese martial arts, along with Boxing, Kickboxing and MMA. If you are looking for karate classes in Thrithala, our kung fu program offers the same benefits: belt gradings, self-defense, discipline, flexibility and fitness.',
  },
  {
    q: 'Who are the instructors?',
    a: 'Classes are taught by certified black belt masters trained under Grandmaster Sukumar in Chennai. The academy has produced 16+ black belts and district and state medalists in Wushu, Boxing and Kickboxing.',
  },
  {
    q: 'Which areas do students come from?',
    a: 'Students train with us from Thrithala, Pattambi, Muthuthala, Koottanad, Kumbidi, Perumpilavu and nearby areas of Palakkad district.',
  },
  {
    q: 'How do I join or book a trial session?',
    a: 'Send a WhatsApp message or call +91 90486 81719 to ask about admission, a trial session, and batch fees. You can also use the enquiry form on this page.',
  },
];

const FAQ_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://shaolinkungfukerala.com/#faq',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}).replace(/</g, '\\u003c');

// ============================================================================
// MAIN LANDING PAGE COMPONENT (100% Thrithala Branch Focus)
// ============================================================================
export default function App() {

  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('Youth & Adults (18+ yrs)');
  const [selectedTiming, setSelectedTiming] = useState('Evening (6:30 PM – 8:30 PM)');

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
      <ScrollSyncedShadowCanvas />

      {/* Navigation Header with Official Academy Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="#hero" className="flex items-center gap-2 min-[360px]:gap-2.5 sm:gap-3 min-w-0">
            <img
              src={resolveImageSrc('logo.png')}
              alt="Shaolin Kung-Fu Chamber of Fitness logo"
              className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 object-contain shrink-0"
            />
            <div className="min-w-0 leading-tight">
              <div className="font-black text-[13px] min-[360px]:text-sm sm:text-base text-white uppercase tracking-wide truncate">
                Shaolin Kung-Fu
              </div>
              <div className="text-[10px] min-[360px]:text-[11px] sm:text-xs text-zinc-400 truncate">
                Chamber of Fitness · Thrithala
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-300 whitespace-nowrap">
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
            <a href="#faq" className="hover:text-amber-400 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 min-[360px]:px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm whitespace-nowrap transition-colors shrink-0 cursor-pointer"
            >
              <span>Join Now</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 max-[359px]:hidden" />
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
                  <h1 className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em]">
                    Kung Fu &amp; Martial Arts Classes in Thrithala, Palakkad
                  </h1>
                </div>
                <p className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  MASTER YOUR{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">
                    BODY, MIND
                  </span>{' '}
                  & SPIRIT.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed"
              >
                Shaolin Kung-Fu Chamber of Fitness is a martial arts academy on
                Palakkad–Ponnani Road in Thrithala, Palakkad district, Kerala. We
                train kids, teens, women, and adults in authentic Shaolin Kung Fu,
                Competitive Wushu, Boxing, Kickboxing, MMA, and practical
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
            <div className="h-64 sm:h-80 lg:h-auto lg:col-span-3 lg:min-h-[400px] pointer-events-none" aria-hidden="true" />

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
                  fetchPriority="high"
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
            <div className="h-64 sm:h-80 lg:h-auto lg:col-span-3 lg:min-h-[400px] pointer-events-none" aria-hidden="true" />

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
                  alt="Wushu student holding a standing vertical split kick in a Shaolin uniform, Thrithala"
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
                MARTIAL ARTS CLASSES{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                  IN THRITHALA
                </span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Six martial arts programs under one roof: Shaolin Kung Fu, Wushu,
                Boxing, Kickboxing, MMA &amp; self-defense, and kids martial arts.
                Every student in our Thrithala chamber receives structured coaching
                across striking, flexibility, acrobatics, and practical self-defense,
                tailored for kids, teens, women, and adults.
              </p>
            </div>

            {/* Center Column: Open Corridor */}
            <div className="h-64 sm:h-80 lg:h-auto lg:col-span-3 lg:min-h-[360px] pointer-events-none" aria-hidden="true" />

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
                  alt="Two martial arts students trading high kicks on the Bharathapuzha riverbank, Thrithala"
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
                        alt={`${prog.title} class at Shaolin Kung-Fu Chamber of Fitness, Thrithala`}
                        className={`w-full h-full object-cover ${prog.photoClass ?? ''} group-hover:scale-108 transition-transform duration-700 ease-out`}
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
            <div className="h-64 sm:h-80 lg:h-auto lg:col-span-3 lg:min-h-[360px] pointer-events-none" aria-hidden="true" />

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
                  alt="Kids martial arts acrobatics: partner handstand stunt in the Thrithala indoor hall"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>

          {/* Full Bento Photo Grid (13 unique photos, 3 cols x 7 rows on md+) */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] sm:auto-rows-[260px] gap-3 sm:gap-4">
            {ALL_ACADEMY_PHOTOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setLightboxPhoto(item.src)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 cursor-pointer shadow-xl ${item.span}`}
              >
                <img
                  src={resolveImageSrc(item.src)}
                  alt={item.alt}
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

              <h2 className="text-xl sm:text-3xl font-black text-white">
                Class Timings &amp; Location in Thrithala
              </h2>
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
            <div className="h-64 sm:h-80 lg:h-auto lg:col-span-3 lg:min-h-[400px] pointer-events-none" aria-hidden="true" />

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
                  alt="Students doing low-stance conditioning on the mats inside the Thrithala martial arts chamber"
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
            FAQ: answers for local searches and AI assistants
        ==================================================================== */}
        <section
          id="faq"
          className="scroll-mt-24 py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }}
          />
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-3 bg-transparent">
              <MessageCircle className="w-3.5 h-3.5" /> Questions Parents &amp; Students Ask
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              KUNG FU CLASSES IN THRITHALA:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                FAQ
              </span>
            </h2>
            <p lang="ml" className="mt-3 text-sm sm:text-base text-zinc-400">
              തൃത്താലയിലെ കുങ്ഫു, ആയോധനകല പരിശീലന കേന്ദ്രം
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm open:border-amber-500/40 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm sm:text-base font-bold text-white [&::-webkit-details-marker]:hidden">
                  <h3>{q}</h3>
                  <ChevronRight className="w-4 h-4 shrink-0 text-amber-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {a}
                </p>
              </details>
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
            <div className="h-64 sm:h-80 lg:h-auto lg:col-span-3 lg:min-h-[400px] pointer-events-none" aria-hidden="true" />

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
                  alt="Two black belt students in Shaolin uniforms practising kung fu forms outdoors"
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

      {/* Closing stage: empty so the page ends on the warrior's salute alone */}
      <div aria-hidden="true" className="h-lvh pointer-events-none" />

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
              <address className="not-italic text-[10px] sm:text-xs text-zinc-500">
                Palakkad – Ponnani Rd, Thrithala, Palakkad, Kerala 679534
              </address>
              <p className="text-[10px] sm:text-xs text-zinc-600 mt-0.5">
                Kung Fu, Wushu, Boxing, Kickboxing, MMA &amp; self-defense classes for
                Thrithala, Pattambi, Koottanad, Kumbidi, Muthuthala &amp; Perumpilavu
              </p>
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
