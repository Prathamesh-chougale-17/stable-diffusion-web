"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface FormData {
  prompt: string;
  seed: number;
  num_inference_steps: number;
  guidance_scale: number;
  eta: number;
}

export default function GeneratePage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      prompt: "",
      seed: 42,
      num_inference_steps: 50,
      guidance_scale: 7.5,
      eta: 0.5,
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === "success") {
        // Add timestamp to prevent caching
        setImage(`http://localhost:5000/${result.image_path}?t=${Date.now()}`);
      } else {
        throw new Error(result.message || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate image"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Stable Diffusion Image Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your prompt..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe the image you want to generate
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seed</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="num_inference_steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inference Steps</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
            </form>
          </Form>
        </Card>

        <Card className="p-6">
          <div className="aspect-square w-full rounded-lg border border-dashed flex items-center justify-center relative">
            {loading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : error ? (
              <p className="text-red-500 text-center p-4">{error}</p>
            ) : image ? (
              <Image
                src={image}
                alt="Generated image"
                fill
                className="rounded-lg object-contain p-2"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized // Add this to bypass Next.js image optimization
              />
            ) : (
              <p className="text-muted-foreground">
                Generated image will appear here
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
