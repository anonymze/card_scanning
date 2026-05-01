import { createNanoIconSet } from 'react-native-nano-icons';
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  RadialGradient,
  Rect,
  Stop,
  SvgProps,
} from 'react-native-svg';
import glyphMap from '@/assets/nanoicons/icons.glyphmap.json';

const Icon = createNanoIconSet(glyphMap);

type EmptyStateVariant = 'decks' | 'collection';

const EmptyCardsIllustration = ({
  size = 280,
  variant,
}: {
  size?: number;
  variant: EmptyStateVariant;
}) => {
  const gradientId = `empty-glow-${variant}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id={gradientId} cx="50%" cy="52%" r="45%">
          <Stop offset="0%" stopColor="#E5A520" stopOpacity="0.18" />
          <Stop offset="100%" stopColor="#E5A520" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="200" height="200" fill={`url(#${gradientId})`} />
      <G transform="rotate(-13, 100, 106)">
        <Rect x="62" y="52" width="76" height="108" rx="7" fill="#0F1826" stroke="#253040" strokeWidth="1.5" opacity="0.55" />
        <Rect x="69" y="59" width="62" height="94" rx="4" fill="none" stroke="#253040" strokeWidth="1" opacity="0.6" />
      </G>
      <G transform={variant === 'collection' ? 'rotate(-7, 100, 106)' : 'rotate(-5, 100, 106)'}>
        <Rect x="62" y="52" width="76" height="108" rx="7" fill="#111D2E" stroke="#2E4060" strokeWidth="1.5" opacity="0.8" />
        <Rect x="69" y="59" width="62" height="94" rx="4" fill="none" stroke="#2E4060" strokeWidth="1" opacity="0.6" />
      </G>
      <Rect x="62" y="52" width="76" height="108" rx="7" fill="#0E1A2A" stroke="#E5A520" strokeWidth="1.5" strokeDasharray="7 4" />
      <Path d="M68 58 L68 65 M68 58 L75 58" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M132 58 L132 65 M132 58 L125 58" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M68 154 L68 147 M68 154 L75 154" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M132 154 L132 147 M132 154 L125 154" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      {variant === 'decks' ? (
        <>
          <Path d="M100 96 L100 116" stroke="#E5A520" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <Path d="M90 106 L110 106" stroke="#E5A520" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        </>
      ) : (
        <>
          <Circle cx="100" cy="102" r="14" stroke="#E5A520" strokeWidth="2" opacity="0.85" />
          <Circle cx="100" cy="102" r="7" stroke="#E5A520" strokeWidth="1.5" opacity="0.5" />
          <Path d="M110 112 L118 120" stroke="#E5A520" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        </>
      )}
      <Circle cx="148" cy="62" r="2" fill="#E5A520" opacity="0.45" />
      <Circle cx="155" cy="75" r="1.2" fill="#E5A520" opacity="0.25" />
      <Circle cx="52" cy="80" r="1.8" fill="#E5A520" opacity="0.35" />
      <Circle cx="46" cy="120" r="1.2" fill="#E5A520" opacity="0.2" />
      <Circle cx="152" cy="130" r="1.5" fill="#E5A520" opacity="0.3" />
      <Path d="M44 60 L45.5 63 L49 64.5 L45.5 66 L44 69 L42.5 66 L39 64.5 L42.5 63 Z" fill="#E5A520" opacity="0.25" />
      <Path d="M158 100 L159 102.5 L161.5 103.5 L159 104.5 L158 107 L157 104.5 L154.5 103.5 L157 102.5 Z" fill="#E5A520" opacity="0.2" />
    </Svg>
  );
};

const CloseIcon = ({
  color = 'currentColor',
  size = 12,
  ...props
}: { color?: string; size?: number } & SvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6 6 L18 18 M18 6 L6 18"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const PlusIcon = ({
  color = 'currentColor',
  size = 24,
  ...props
}: { color?: string; size?: number } & SvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 5 L12 19 M5 12 L19 12"
        stroke={color}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const EyeIcon = ({
  color = 'currentColor',
  width = 20,
  height = 20,
  ...props
}: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12.5} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
};

const EmptySearchIllustration = ({ size = 280 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="empty-search-glow" cx="50%" cy="52%" r="45%">
          <Stop offset="0%" stopColor="#E5A520" stopOpacity="0.18" />
          <Stop offset="100%" stopColor="#E5A520" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="200" height="200" fill="url(#empty-search-glow)" />
      <G transform="rotate(-13, 100, 106)">
        <Rect x="62" y="52" width="76" height="108" rx="7" fill="#0F1826" stroke="#253040" strokeWidth="1.5" opacity="0.55" />
      </G>
      <G transform="rotate(-7, 100, 106)">
        <Rect x="62" y="52" width="76" height="108" rx="7" fill="#111D2E" stroke="#2E4060" strokeWidth="1.5" opacity="0.8" />
      </G>
      <Rect x="62" y="52" width="76" height="108" rx="7" fill="#0E1A2A" stroke="#E5A520" strokeWidth="1.5" strokeDasharray="7 4" />
      <Path d="M68 58 L68 65 M68 58 L75 58" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M132 58 L132 65 M132 58 L125 58" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M68 154 L68 147 M68 154 L75 154" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M132 154 L132 147 M132 154 L125 154" stroke="#E5A520" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <Path d="M90 96 L110 116" stroke="#E5A520" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <Path d="M110 96 L90 116" stroke="#E5A520" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <Circle cx="148" cy="62" r="2" fill="#E5A520" opacity="0.45" />
      <Circle cx="155" cy="75" r="1.2" fill="#E5A520" opacity="0.25" />
      <Circle cx="52" cy="80" r="1.8" fill="#E5A520" opacity="0.35" />
      <Circle cx="46" cy="120" r="1.2" fill="#E5A520" opacity="0.2" />
      <Circle cx="152" cy="130" r="1.5" fill="#E5A520" opacity="0.3" />
      <Path d="M44 60 L45.5 63 L49 64.5 L45.5 66 L44 69 L42.5 66 L39 64.5 L42.5 63 Z" fill="#E5A520" opacity="0.25" />
      <Path d="M158 100 L159 102.5 L161.5 103.5 L159 104.5 L158 107 L157 104.5 L154.5 103.5 L157 102.5 Z" fill="#E5A520" opacity="0.2" />
    </Svg>
  );
};

export {
  Icon,
  EyeIcon,
  CloseIcon,
  PlusIcon,
  EmptyCardsIllustration,
  EmptySearchIllustration,
};
export type { EmptyStateVariant };
