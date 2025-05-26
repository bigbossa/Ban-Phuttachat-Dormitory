import { useLanguage } from "@/providers/LanguageProvider";
// Import your custom language provider
//           totalServices={stats.totalServices}  
//           t={t}
//         />
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OccupancyVisualizationProps {
  occupiedRooms: number;
  totalRooms: number;
}

export function OccupancyVisualization({ occupiedRooms, totalRooms }: OccupancyVisualizationProps) {
  const { t } = useLanguage(); // Get t from your custom provider

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("roomer.text1")}</CardTitle>
        <CardDescription>{t("roomer.text2")}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="flex flex-col h-full justify-center">
          <div className="text-center text-4xl font-bold text-primary">
            {occupiedRooms}/{totalRooms}
          </div>
          <div className="mt-4 text-muted-foreground text-center">
            Rooms Occupied
          </div>
          <div className="mt-6">
            <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${
                    (occupiedRooms / totalRooms) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-center">
              {Math.round((occupiedRooms / totalRooms) * 100)}%
              Occupancy
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
