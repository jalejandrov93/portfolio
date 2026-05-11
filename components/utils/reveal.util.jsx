import { useRef } from 'react';
import {
	motion,
	useMotionValue,
	useSpring,
	useScroll,
	useTransform,
} from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const variants = {
	hidden: { opacity: 0, y: 28 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PREMIUM_EASE } },
};

export default function Reveal({ children, delay = 0, className, as = 'div' }) {
	const MotionTag = motion[as] || motion.div;
	return (
		<MotionTag
			className={className}
			variants={variants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6, ease: PREMIUM_EASE, delay }}
		>
			{children}
		</MotionTag>
	);
}

const staggerContainer = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const staggerItem = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: PREMIUM_EASE } },
};

export function Stagger({ children, className, amount = 0.15 }) {
	return (
		<motion.div
			className={className}
			variants={staggerContainer}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount }}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, className }) {
	return (
		<motion.div className={className} variants={staggerItem}>
			{children}
		</motion.div>
	);
}

// SlideIn — directional entrance for section-level reveals.
const slideInVariants = (from, distance) => {
	const offsets = {
		left:   { x: -distance, y: 0 },
		right:  { x: distance,  y: 0 },
		top:    { x: 0,         y: -distance },
		bottom: { x: 0,         y: distance },
	};
	return {
		hidden: { opacity: 0, ...(offsets[from] || offsets.bottom) },
		show:   { opacity: 1, x: 0, y: 0 },
	};
};

export function SlideIn({
	children,
	from = 'bottom',
	delay = 0,
	distance = 48,
	duration = 0.65,
	amount = 0.2,
	className,
	as = 'div',
}) {
	const MotionTag = motion[as] || motion.div;
	return (
		<MotionTag
			className={className}
			variants={slideInVariants(from, distance)}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount }}
			transition={{ duration, ease: PREMIUM_EASE, delay }}
		>
			{children}
		</MotionTag>
	);
}

// Magnetic — pointer-following hover wrapper for CTAs and accent UI.
// Uses springs so the return-to-rest feels alive, not robotic.
export function Magnetic({
	children,
	strength = 0.3,
	className,
	stiffness = 150,
	damping = 15,
}) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness, damping, mass: 0.12 });
	const springY = useSpring(y, { stiffness, damping, mass: 0.12 });

	const handleMouseMove = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		x.set((event.clientX - centerX) * strength);
		y.set((event.clientY - centerY) * strength);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			className={className}
			style={{ x: springX, y: springY, display: 'inline-flex' }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</motion.div>
	);
}

// Parallax — scroll-linked vertical translation. speed=0.3 ≈ subtle, 0.6 ≈ pronounced.
// Direction negative pulls the layer up faster than scroll (foreground feel).
export function Parallax({
	children,
	speed = 0.3,
	direction = 'up',
	className,
}) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const distance = `${speed * 100}%`;
	const range = direction === 'up' ? ['0%', `-${distance}`] : ['0%', distance];
	const y = useTransform(scrollYProgress, [0, 1], range);

	return (
		<motion.div ref={ref} style={{ y }} className={className}>
			{children}
		</motion.div>
	);
}

// Marquee — infinite horizontal ticker for tech-stack rows and accent strips.
// Children are duplicated once for a seamless loop; pass an array of nodes
// (logos, badges, names) — Marquee handles the rest.
export function Marquee({
	children,
	speed = 30,
	direction = 'left',
	gap = '2.5rem',
	className,
}) {
	const range = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];
	return (
		<div
			className={className}
			style={{ overflow: 'hidden', width: '100%', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
		>
			<motion.div
				style={{ display: 'flex', gap, width: 'max-content', flexShrink: 0 }}
				animate={{ x: range }}
				transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
			>
				{children}
				{children}
			</motion.div>
		</div>
	);
}
