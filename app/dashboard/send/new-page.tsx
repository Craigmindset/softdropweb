"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "'components/ui/card"'";
import { Button } from "'components/ui/button"'";
import { Input } from "'components/ui/input"'";
import { Label } from "'components/ui/label"'";
import { RadioGroup, RadioGroupItem } from "'components/ui/radio-group"'";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "'components/ui/select"'";
import { Checkbox } from "'components/ui/checkbox"'";
import { Camera, Upload, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "'components/ui/dialog"'";
import { Alert, AlertDescription, AlertTitle } from "'components/ui/alert"'";

export default function SendItemPage() {
  const router = useRouter();
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mapsError, setMapsError] = useState("");
  const [route, setRoute] = useState("intercity");
  const [documentType, setDocumentType] = useState("");
  const [insure, setInsure] = useState(false);
  const [itemValue, setItemValue] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [deliveryPin, setDeliveryPin] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<"door" | "arrival" | "">("");
  const [showDoorDeliveryDialog, setShowDoorDeliveryDialog] = useState(false);

  // Form handlers remain the same as before...

  return (
    <div className="flex flex-col gap-6">
      {/* Header remains the same */}

      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
          <CardDescription>Provide information about the item you want to send</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Previous form sections remain unchanged */}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pickup & Delivery Locations</h3>

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
                          placeholder="Enter detailed pickup address"
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
                          placeholder="Enter detailed delivery address"
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

            {/* Rest of the form remains unchanged */}
          </form>
        </CardContent>
      </Card>

      {/* Dialog components remain unchanged */}
    </div>
  );
}
