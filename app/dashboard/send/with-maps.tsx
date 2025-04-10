"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SendWithMaps() {
  const router = useRouter();
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mapsError, setMapsError] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>Enter pickup and delivery locations</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <LoadScript 
                googleMapsApiKey="AIzaSyD72etivyT_7MQfVKR44l_R01R6J7xAB-Q"
                libraries={["places"]}
                loadingElement={<div className="text-sm text-muted-foreground">Loading maps...</div>}
                onError={(error) => {
                  console.error("Google Maps API error:", error);
                  setMapsError("Failed to load Google Maps. Please check your API key and try again.");
                }}
                onLoad={() => {
                  console.log("Google Maps API loaded successfully");
                  setMapsLoaded(true);
                }}
              >
                {mapsError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{mapsError}</AlertDescription>
                  </Alert>
                )}

                {mapsLoaded && (
                  <>
                    <div>
                      <Label htmlFor="pickup-location">Pickup Location</Label>
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          autocomplete.setFields(["formatted_address", "geometry"]);
                        }}
                        onPlaceChanged={() => {
                          const input = document.getElementById("pickup-location") as HTMLInputElement;
                          setPickupLocation(input.value);
                        }}
                      >
                        <Input
                          id="pickup-location"
                          placeholder="Enter pickup address"
                          className="mt-1"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          required
                        />
                      </Autocomplete>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="drop-location">Drop Location</Label>
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          autocomplete.setFields(["formatted_address", "geometry"]);
                        }}
                        onPlaceChanged={() => {
                          const input = document.getElementById("drop-location") as HTMLInputElement;
                          setDropLocation(input.value);
                        }}
                      >
                        <Input
                          id="drop-location"
                          placeholder="Enter delivery address"
                          className="mt-1"
                          value={dropLocation}
                          onChange={(e) => setDropLocation(e.target.value)}
                          required
                        />
                      </Autocomplete>
                    </div>
                  </>
                )}
              </LoadScript>
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
