// components/RadarChart.tsx
import {
    Radar,
    RadarChart as RechartsRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';

type RadarData = {
    label: string;
    value: number;
};

export default function RadarChart({ data }: { data: RadarData[] }) {
    return (
        <ResponsiveContainer width="100%" height={180}>
            <RechartsRadarChart outerRadius="80%" data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                className="animate-in fade-in duration-700">
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar
                    name="喵星指数"
                    dataKey="value"
                    stroke="#f97316" // Tailwind orange-500
                    fill="#fb923c"   // Tailwind orange-400
                    fillOpacity={0.6}
                />
            </RechartsRadarChart>
        </ResponsiveContainer>
    );
}