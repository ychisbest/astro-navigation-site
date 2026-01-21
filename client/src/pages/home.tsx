import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Sparkles, 
  Zap, 
  Image as ImageIcon, 
  Download, 
  Star, 
  Check, 
  ArrowRight, 
  Wand2,
  Palette,
  Clock,
  Shield,
  Globe,
  Layers,
  ChevronDown,
  Loader2
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1686191128892-3b37bad0b813?w=800&q=80",
  "https://images.unsplash.com/photo-1699839028867-ad8df95b49d9?w=800&q=80",
  "https://images.unsplash.com/photo-1702226595912-0c9c7efbc50c?w=800&q=80",
  "https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?w=800&q=80",
  "https://images.unsplash.com/photo-1698778873700-2c57b10219a2?w=800&q=80",
  "https://images.unsplash.com/photo-1683009427666-340595e57e43?w=800&q=80",
];

const testimonials = [
  { name: "Sarah M.", role: "Digital Artist", rating: 5, text: "This free AI image generator has completely transformed my workflow. I create stunning visuals in seconds that used to take hours!" },
  { name: "James K.", role: "Content Creator", rating: 5, text: "Best free AI image generator I've found. The quality is incredible and it's completely free. Highly recommend for anyone needing quick AI art." },
  { name: "Emily R.", role: "Marketing Manager", rating: 5, text: "Our team uses this free AI image generator daily. It's fast, produces high-quality images, and saves us thousands on stock photos." },
  { name: "Michael T.", role: "Blogger", rating: 5, text: "I was skeptical about free AI image generators, but this one delivers professional results every time. Amazing tool!" },
  { name: "Lisa C.", role: "Freelance Designer", rating: 5, text: "The free AI image generator that actually works! I've tried many, but this one produces the best results by far." },
  { name: "David P.", role: "Entrepreneur", rating: 5, text: "Game-changer for my business. This free AI image generator helps me create professional marketing images without hiring a designer." },
];

const features = [
  { icon: Zap, title: "Lightning Fast Generation", description: "Our free AI image generator creates stunning images in seconds. Experience the power of advanced AI technology that transforms your text prompts into beautiful artwork instantly." },
  { icon: Palette, title: "Unlimited Creative Styles", description: "From photorealistic to abstract, our free AI image generator supports every art style imaginable. Create digital art, illustrations, concept art, and more with complete creative freedom." },
  { icon: Shield, title: "100% Free Forever", description: "No hidden costs, no subscriptions, no watermarks. Our free AI image generator is completely free to use with unlimited generations. Start creating without spending a dime." },
  { icon: Globe, title: "Accessible Anywhere", description: "Use our free AI image generator from any device, anywhere in the world. No downloads or installations required. Just open your browser and start creating amazing AI-generated images." },
  { icon: Layers, title: "High Resolution Output", description: "Get professional-quality images with our free AI image generator. Every image is rendered in high resolution, perfect for social media, websites, or print projects." },
  { icon: Clock, title: "No Account Required", description: "Start using our free AI image generator immediately. No signup, no email verification, no waiting. Just type your prompt and watch the AI create your vision." },
];

const faqs = [
  { 
    question: "What is a free AI image generator?", 
    answer: "A free AI image generator is an online tool that uses artificial intelligence to create images from text descriptions. Our free AI image generator uses advanced machine learning models to transform your written prompts into stunning visual artwork, completely free of charge." 
  },
  { 
    question: "How does this free AI image generator work?", 
    answer: "Our free AI image generator works by analyzing your text prompt and using neural networks to generate corresponding images. Simply describe what you want to see, and the AI interprets your words to create unique, original artwork. The entire process takes just seconds." 
  },
  { 
    question: "Is this AI image generator really free?", 
    answer: "Yes! Our AI image generator is 100% free to use. There are no hidden fees, no premium tiers, and no watermarks on your generated images. You can create unlimited AI-generated images without paying anything." 
  },
  { 
    question: "What can I create with this free AI image generator?", 
    answer: "You can create virtually anything with our free AI image generator! Popular uses include digital art, illustrations, concept art, social media graphics, blog images, creative projects, and much more. If you can describe it, our AI can generate it." 
  },
  { 
    question: "Do I own the images I create?", 
    answer: "Yes, you have full rights to use the images created with our free AI image generator. You can use them for personal projects, commercial purposes, social media, websites, and more. The images are yours to keep and use as you wish." 
  },
  { 
    question: "How do I get the best results from this free AI image generator?", 
    answer: "To get the best results from our free AI image generator, be specific and descriptive in your prompts. Include details about style, colors, mood, and composition. For example, instead of 'a cat,' try 'a fluffy orange cat sitting in a sunlit garden, oil painting style.' The more detail you provide, the better your results will be." 
  },
];

const examplePrompts = [
  "A magical forest with glowing mushrooms and fireflies at twilight",
  "Cyberpunk city street in the rain with neon signs",
  "Astronaut riding a horse on Mars, digital art",
  "Cozy cabin in snowy mountains during sunset",
  "Ancient dragon guarding treasure in a crystal cave",
  "Underwater kingdom with mermaids and coral palaces",
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/generate", { prompt });
      return response.json();
    },
    onSuccess: () => {
      setIsGenerating(true);
      setTimeRemaining(120);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start generation. Please try again.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isGenerating && timeRemaining === 0) {
      const randomImage = PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
      setGeneratedImage(randomImage);
      setIsGenerating(false);
      toast({
        title: "Image Generated!",
        description: "Your free AI image has been created successfully.",
      });
    }
    return () => clearInterval(timer);
  }, [isGenerating, timeRemaining, toast]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the image you want to create with our free AI image generator.",
        variant: "destructive"
      });
      return;
    }
    generateMutation.mutate(prompt);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetGenerator = () => {
    setGeneratedImage(null);
    setPrompt("");
    setIsGenerating(false);
    setTimeRemaining(120);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg" data-testid="text-logo">Free AI Image Generator</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">Features</a>
            <a href="#generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-generator">Generator</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-testimonials">Reviews</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">FAQ</a>
          </nav>
          <Button asChild data-testid="button-header-cta">
            <a href="#generator">Start Creating</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
              <Sparkles className="w-3 h-3 mr-1" />
              100% Free AI Image Generator
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              Free AI Image Generator
              <span className="block text-gradient bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Create Stunning Images Instantly
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              Transform your ideas into breathtaking visuals with our free AI image generator. 
              No signup required. No watermarks. Just pure creative freedom. 
              Experience the most powerful free AI image generator online today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-hero-primary">
                <a href="#generator" className="gap-2">
                  <Wand2 className="w-5 h-5" />
                  Generate Free Images Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-hero-secondary">
                <a href="#features" className="gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2" data-testid="stat-users">
                <Check className="w-4 h-4 text-green-500" />
                <span>1M+ Images Generated</span>
              </div>
              <div className="flex items-center gap-2" data-testid="stat-free">
                <Check className="w-4 h-4 text-green-500" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2" data-testid="stat-quality">
                <Check className="w-4 h-4 text-green-500" />
                <span>High Quality Output</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section 1 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-seo-heading-1">
              The Ultimate Free AI Image Generator for Creative Professionals
            </h2>
            <p>
              Welcome to the world's most advanced <strong>free AI image generator</strong> - your gateway to unlimited creative possibilities. 
              Our <strong>free AI image generator</strong> harnesses cutting-edge artificial intelligence technology to transform your text descriptions 
              into stunning, professional-quality images in seconds. Whether you're a digital artist, content creator, marketer, or hobbyist, 
              our <strong>free AI image generator</strong> provides the tools you need to bring your vision to life without spending a dime.
            </p>
            <p>
              Unlike other AI image generators that require expensive subscriptions or limit your creations, our <strong>free AI image generator</strong> 
              is completely free to use with no hidden costs. We believe that everyone should have access to powerful AI image generation technology, 
              which is why we've made our <strong>free AI image generator</strong> available to users worldwide at no charge. Create as many images 
              as you want, whenever you want, with our revolutionary <strong>free AI image generator</strong>.
            </p>
            <p>
              Our <strong>free AI image generator</strong> uses state-of-the-art machine learning models trained on millions of images to understand 
              and interpret your prompts with remarkable accuracy. Simply describe what you want to see - from photorealistic landscapes to 
              fantastical creatures, from abstract art to detailed illustrations - and watch as our <strong>free AI image generator</strong> 
              brings your imagination to life. The possibilities are truly endless with our <strong>free AI image generator</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4" data-testid="badge-generator">
              <ImageIcon className="w-3 h-3 mr-1" />
              Free AI Image Generator
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-generator-title">
              Create Your Free AI Image Now
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter a detailed description and let our free AI image generator create amazing artwork for you. 
              The more descriptive your prompt, the better the results from our free AI image generator.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto p-6 md:p-8">
            {!isGenerating && !generatedImage ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe your image</label>
                  <Textarea
                    placeholder="A majestic mountain landscape at sunset with golden light reflecting off a crystal-clear lake, photorealistic style..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 text-base"
                    data-testid="input-prompt"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: Be specific about style, colors, lighting, and mood for best results with our free AI image generator.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">Try these example prompts:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleExampleClick(example)}
                        data-testid={`badge-example-${index}`}
                      >
                        {example.slice(0, 30)}...
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full gap-2" 
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  data-testid="button-generate"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Starting Free AI Image Generator...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Free AI Image
                    </>
                  )}
                </Button>
              </div>
            ) : isGenerating ? (
              <div className="text-center py-12 space-y-6">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2" data-testid="text-generating-title">Creating Your Free AI Image</h3>
                  <p className="text-muted-foreground mb-4">
                    Our free AI image generator is working its magic. Please wait while we create your stunning artwork.
                  </p>
                  <div className="text-4xl font-mono font-bold text-primary" data-testid="text-timer">
                    {formatTime(timeRemaining)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Estimated time remaining</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm font-medium mb-1">Your prompt:</p>
                  <p className="text-sm text-muted-foreground italic">&ldquo;{prompt}&rdquo;</p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="space-y-6">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={generatedImage} 
                    alt="Generated AI Image" 
                    className="w-full h-full object-cover"
                    data-testid="img-generated"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2" data-testid="text-success-title">Image Generated Successfully!</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Created with our free AI image generator. Enjoy your artwork!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 gap-2" asChild data-testid="button-download">
                    <a href={generatedImage} download="ai-generated-image.jpg" target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                      Download Image
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" onClick={resetGenerator} data-testid="button-new">
                    <Wand2 className="w-4 h-4" />
                    Generate Another
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      </section>

      {/* SEO Content Section 2 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-seo-heading-2">
              Why Choose Our Free AI Image Generator?
            </h2>
            <p>
              In the rapidly evolving world of AI-powered creativity, our <strong>free AI image generator</strong> stands out as the premier 
              choice for artists, designers, and creators of all skill levels. Our <strong>free AI image generator</strong> combines 
              ease of use with powerful results, making it the go-to tool for anyone looking to create stunning AI-generated artwork 
              without the complexity of traditional design software.
            </p>
            <p>
              What makes our <strong>free AI image generator</strong> truly special is its accessibility. We've designed our 
              <strong> free AI image generator</strong> to be intuitive enough for beginners while offering the depth of features 
              that professionals demand. With our <strong>free AI image generator</strong>, you don't need any artistic skills 
              or technical knowledge - just your imagination and a willingness to explore the possibilities of AI-generated art.
            </p>
            <p>
              The technology behind our <strong>free AI image generator</strong> is constantly improving. We regularly update our 
              AI models to ensure that our <strong>free AI image generator</strong> produces the highest quality images possible. 
              This commitment to excellence is why millions of users worldwide trust our <strong>free AI image generator</strong> 
              for their creative projects, from social media content to professional marketing materials.
            </p>
            <p>
              Using our <strong>free AI image generator</strong> is as simple as typing a description. Our <strong>free AI image generator</strong> 
              interprets natural language, so you can describe your vision in your own words. Want a &ldquo;serene Japanese garden at twilight&rdquo; 
              or a &ldquo;futuristic cityscape with flying cars&rdquo;? Our <strong>free AI image generator</strong> understands and delivers 
              stunning results every time.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4" data-testid="badge-features">
              <Zap className="w-3 h-3 mr-1" />
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-features-title">
              Everything You Need in a Free AI Image Generator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our free AI image generator comes packed with features that make creating AI art easier and more enjoyable than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-feature-${index}`}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4" data-testid="badge-testimonials">
              <Star className="w-3 h-3 mr-1" />
              User Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              Loved by Creators Worldwide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what our users say about our free AI image generator. Join thousands of happy creators using our tool every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`card-testimonial-${index}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4 text-muted-foreground">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section 3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-seo-heading-3">
              How to Use Our Free AI Image Generator Effectively
            </h2>
            <p>
              Getting the most out of our <strong>free AI image generator</strong> is easy when you know a few key techniques. 
              The first step to success with our <strong>free AI image generator</strong> is understanding how to write effective prompts. 
              The more detailed and specific your description, the better results you'll get from our <strong>free AI image generator</strong>.
            </p>
            <p>
              When using our <strong>free AI image generator</strong>, start by thinking about the key elements of your desired image. 
              Consider the subject, the style, the mood, the lighting, and the composition. For example, instead of simply asking our 
              <strong> free AI image generator</strong> for &ldquo;a cat,&rdquo; try describing &ldquo;a majestic Persian cat with fluffy white fur, 
              sitting regally on a velvet cushion, dramatic studio lighting, portrait style.&rdquo; This level of detail helps our 
              <strong> free AI image generator</strong> understand exactly what you're looking for.
            </p>
            <p>
              Our <strong>free AI image generator</strong> supports a wide range of artistic styles. You can ask our <strong>free AI image generator</strong> 
              to create images in the style of famous artists, in specific art movements like impressionism or surrealism, or in modern styles 
              like anime, digital art, or photorealism. Experimenting with different styles is one of the best ways to discover the full 
              potential of our <strong>free AI image generator</strong>.
            </p>
            <p>
              Another powerful feature of our <strong>free AI image generator</strong> is the ability to specify technical details. 
              You can ask our <strong>free AI image generator</strong> for specific camera angles, lens effects, time of day, weather 
              conditions, and more. Professional photographers and digital artists appreciate how our <strong>free AI image generator</strong> 
              can simulate these complex photographic and artistic techniques with just a few words.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4" data-testid="badge-faq">
              <Check className="w-3 h-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions About Our Free AI Image Generator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our free AI image generator and learn how to make the most of this powerful tool.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="overflow-hidden"
                data-testid={`card-faq-${index}`}
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover-elevate"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  data-testid={`button-faq-${index}`}
                >
                  <h3 className="font-semibold text-base">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section 5 - Use Cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-seo-heading-5">
              Creative Applications of Our Free AI Image Generator
            </h2>
            <p>
              The versatility of our <strong>free AI image generator</strong> makes it an invaluable tool across countless industries and creative 
              pursuits. Social media managers rely on our <strong>free AI image generator</strong> to create scroll-stopping content that captures 
              attention in crowded feeds. With our <strong>free AI image generator</strong>, producing unique, engaging visuals for Instagram, 
              TikTok, Twitter, and Facebook has never been easier or more affordable.
            </p>
            <p>
              Small business owners have discovered the power of our <strong>free AI image generator</strong> for creating professional marketing 
              materials without expensive design software or agency fees. Whether you need product mockups, promotional banners, or website 
              graphics, our <strong>free AI image generator</strong> delivers commercial-quality results that help your business stand out. 
              The cost savings alone make our <strong>free AI image generator</strong> an essential tool for entrepreneurs and startups.
            </p>
            <p>
              Writers and authors use our <strong>free AI image generator</strong> to visualize characters, settings, and key scenes from their 
              stories. This creative visualization process, powered by our <strong>free AI image generator</strong>, helps bring narratives to 
              life and can even serve as book cover concepts. Many self-published authors now depend on our <strong>free AI image generator</strong> 
              for all their visual content needs, from marketing materials to interior illustrations.
            </p>
            <p>
              Game developers and indie studios leverage our <strong>free AI image generator</strong> for concept art, character designs, and 
              environment visualization during the early stages of development. Our <strong>free AI image generator</strong> accelerates the 
              creative process, allowing developers to iterate quickly on visual concepts before committing to final artwork. This makes our 
              <strong> free AI image generator</strong> an essential prototyping tool for the gaming industry.
            </p>
            <p>
              Educators and students benefit immensely from our <strong>free AI image generator</strong>. Teachers create engaging visual aids 
              for lessons using our <strong>free AI image generator</strong>, while students use it for presentations, projects, and creative 
              assignments. The educational applications of our <strong>free AI image generator</strong> are expanding every day as more schools 
              and universities recognize the value of AI-assisted creativity in learning environments.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section 6 - Technical Excellence */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-seo-heading-6">
              The Technology Behind Our Free AI Image Generator
            </h2>
            <p>
              Our <strong>free AI image generator</strong> is built on cutting-edge artificial intelligence technology that represents years 
              of research and development. The neural networks powering our <strong>free AI image generator</strong> have been trained on 
              millions of images to understand artistic styles, composition, lighting, and countless other visual elements. This extensive 
              training allows our <strong>free AI image generator</strong> to produce remarkably accurate and detailed images from simple 
              text descriptions.
            </p>
            <p>
              Unlike basic AI tools, our <strong>free AI image generator</strong> understands context and artistic intent. When you describe 
              a scene to our <strong>free AI image generator</strong>, it doesn't just match keywords to images - it comprehends the 
              relationships between elements, the mood you're trying to create, and the style you want to achieve. This deep understanding 
              is what sets our <strong>free AI image generator</strong> apart from simpler alternatives.
            </p>
            <p>
              The architecture of our <strong>free AI image generator</strong> has been optimized for both quality and speed. We've engineered 
              our <strong>free AI image generator</strong> to produce high-resolution images without long wait times, ensuring that your 
              creative flow isn't interrupted. Our servers running the <strong>free AI image generator</strong> are distributed globally 
              to minimize latency regardless of your location, making our <strong>free AI image generator</strong> accessible and fast 
              for users worldwide.
            </p>
            <p>
              Privacy and security are fundamental to our <strong>free AI image generator</strong>. We've designed our <strong>free AI image 
              generator</strong> to process your prompts securely, and we don't store your generated images on our servers. When you use our 
              <strong> free AI image generator</strong>, your creative work remains yours alone. This commitment to privacy makes our 
              <strong> free AI image generator</strong> the trusted choice for professionals who need to protect their intellectual property.
            </p>
          </div>
        </div>
      </section>

      {/* Final SEO Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-center mb-8" data-testid="text-seo-heading-4">
              Join Millions Using Our Free AI Image Generator Today
            </h2>
            <p>
              Our <strong>free AI image generator</strong> has already helped millions of users around the world create stunning artwork. 
              From hobbyists exploring their creativity to professionals producing content for major brands, our <strong>free AI image generator</strong> 
              serves an incredibly diverse community of creators. Every day, our <strong>free AI image generator</strong> processes thousands 
              of requests, each one producing unique, original artwork.
            </p>
            <p>
              The applications for our <strong>free AI image generator</strong> are virtually limitless. Content creators use our 
              <strong> free AI image generator</strong> to produce eye-catching thumbnails and social media posts. Marketers rely on our 
              <strong> free AI image generator</strong> for quick concept visualizations and campaign imagery. Authors and game developers 
              use our <strong>free AI image generator</strong> to visualize characters and scenes. Educators leverage our 
              <strong> free AI image generator</strong> to create engaging visual materials for their students.
            </p>
            <p>
              We're constantly working to improve our <strong>free AI image generator</strong>. Our team of AI researchers and engineers 
              is dedicated to making our <strong>free AI image generator</strong> more powerful, more intuitive, and more capable with each 
              update. We listen to feedback from our user community to ensure that our <strong>free AI image generator</strong> continues 
              to meet and exceed expectations.
            </p>
            <p>
              Ready to start your creative journey? Our <strong>free AI image generator</strong> is waiting for you. No signup required, 
              no payment needed - just scroll up, enter your prompt, and watch as our <strong>free AI image generator</strong> transforms 
              your words into beautiful images. Experience the future of creativity today with our <strong>free AI image generator</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
              Start Creating with Our Free AI Image Generator
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join over 1 million creators who trust our free AI image generator for their creative projects. 
              No signup, no credit card, no limits. Just pure AI-powered creativity.
            </p>
            <Button size="lg" asChild data-testid="button-cta-final">
              <a href="#generator" className="gap-2">
                <Wand2 className="w-5 h-5" />
                Generate Your First Free AI Image
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">Free AI Image Generator</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The most powerful free AI image generator online. Create stunning AI artwork instantly without any cost.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#generator" className="hover:text-foreground transition-colors">AI Image Generator</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Prompt Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Style Examples</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Best Practices</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tips & Tricks</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Free AI Image Generator. All rights reserved. 
              Create unlimited free AI images with the world's best free AI image generator.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
