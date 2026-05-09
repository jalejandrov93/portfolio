import { motion } from 'framer-motion';

const variants = {
	hidden: { opacity: 0, y: 28 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
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
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
