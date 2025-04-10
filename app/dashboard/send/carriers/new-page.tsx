"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CarriersPage() {
  const searchParams = useSearchParams();
  const pickupLocation = searchParams.get("pickup");
  const dropLocation = searchParams.get("drop");

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Pickup Location:</h3>
            <p className="text-muted-foreground">
              {pickupLocation || "Not specified"}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Drop Location:</h3>
            <p className="text-muted-foreground">
              {dropLocation || "Not specified"}
            </p>
          </div>

          <Button className="w-full mt-4">
            Confirm and Find Carriers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
