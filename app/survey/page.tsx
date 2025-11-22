"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight, CheckCircle2 } from "lucide-react"

type SurveyFormData = {
  businessName: string
  email: string
  website: string
  question1: string
  question2: string
  question3: string
  question4: string
  question5: string
  question6: string
  question7: string
  question8: string
  question9: string
  question10: string
}

const surveyQuestions = [
  {
    id: "question1",
    question: "What best describes your business type?",
    options: [
      { value: "A", label: "Individual Seller" },
      { value: "B", label: "Small Brand (2-10 employees)" },
      { value: "C", label: "Marketing Agency" },
    ],
  },
  {
    id: "question2",
    question: "Where do you currently sell online?",
    options: [
      { value: "A", label: "Only Amazon" },
      { value: "B", label: "Only Shopify" },
      { value: "C", label: "Both Amazon & Shopify" },
    ],
  },
  {
    id: "question3",
    question: "What is your top priority for AI automation?",
    options: [
      { value: "A", label: "Boosting product visibility/rank" },
      { value: "B", label: "Saving time on content creation" },
      { value: "C", label: "Automating social media promotion" },
    ],
  },
  {
    id: "question4",
    question: "What task is most manual/tedious for you today?",
    options: [
      { value: "A", label: "Listing optimization/keywords" },
      { value: "B", label: "Competitor research and tracking" },
      { value: "C", label: "Social media posting/scheduling" },
    ],
  },
  {
    id: "question5",
    question: "Which AI agent would bring you the most value?",
    options: [
      { value: "A", label: "Keyword optimization agent" },
      { value: "B", label: "Competitor monitoring agent" },
      { value: "C", label: "Review sentiment/insights agent" },
    ],
  },
  {
    id: "question6",
    question: "When do you need help from an AI agent most?",
    options: [
      { value: "A", label: "Launching new products" },
      { value: "B", label: "Preparing for sales/promotions" },
      { value: "C", label: "Responding to customer reviews" },
    ],
  },
  {
    id: "question7",
    question: "What do you struggle with on Amazon/Shopify?",
    options: [
      { value: "A", label: "Ranking for the right keywords" },
      { value: "B", label: "Creating high-quality comparison content" },
      { value: "C", label: "Managing store across multiple channels" },
    ],
  },
  {
    id: "question8",
    question: "How do you prefer to receive insights/reports?",
    options: [
      { value: "A", label: "In-app dashboard" },
      { value: "B", label: "Weekly email summary" },
      { value: "C", label: "Instant alerts (SMS/Push)" },
    ],
  },
  {
    id: "question9",
    question: "What kind of social media bot would you use?",
    options: [
      { value: "A", label: "Engages users with product info" },
      { value: "B", label: "Helps run giveaway events" },
      { value: "C", label: "Promotes new products automatically" },
    ],
  },
  {
    id: "question10",
    question: "Which feature would you pay extra for?",
    options: [
      { value: "A", label: "Real-time pricing alerts" },
      { value: "B", label: "Automated competitor content audits" },
      { value: "C", label: "Custom AI agents on demand" },
    ],
  },
]

export default function SurveyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<SurveyFormData>({
    defaultValues: {
      businessName: "",
      email: "",
      website: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
      question7: "",
      question8: "",
      question9: "",
      question10: "",
    },
  })

  const onSubmit = async (data: SurveyFormData) => {
    console.log("[v0] Survey submitted:", data)
    // TODO: Send survey data to API endpoint
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription className="text-base">
                Your survey has been submitted successfully. We'll use your feedback to improve InstaRank and tailor the
                experience to your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="mt-4">
                <a href="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">InstaRank New Customer Survey</h1>
          <p className="text-muted-foreground text-lg">
            Help us understand your needs so we can provide the best AI-powered optimization for your business
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  rules={{ required: "Business name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website/Store URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourstore.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Survey Questions */}
            {surveyQuestions.map((q, index) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {index + 1}. {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name={q.id as keyof SurveyFormData}
                    rules={{ required: "Please select an option" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                            {q.options.map((option) => (
                              <div key={option.value} className="flex items-start space-x-3 space-y-0">
                                <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                                <Label
                                  htmlFor={`${q.id}-${option.value}`}
                                  className="font-normal cursor-pointer leading-relaxed"
                                >
                                  <span className="font-semibold">{option.value}.</span> {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}

            {/* Submit Button */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Survey"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Your responses help us create the perfect AI experience for your business
                </p>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
}
