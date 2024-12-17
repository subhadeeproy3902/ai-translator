"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeftRight,
  Copy,
  Github,
  Loader2,
  Mic,
  Moon,
  Sun,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function Component() {
  const [inputText, setInputText] = useState("Hey, how are u?");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("english");
  const [outputLanguage, setOutputLanguage] = useState("hindi");
  const [theme, setTheme] = useState("light");
  const [isListening, setIsListening] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    speechSynthesisRef.current = window.speechSynthesis;
  }, [theme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleLanguageSwap = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setInputText(outputText);
    setOutputText("");
  };

  const handleClearText = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard");
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = inputLanguage === "english" ? "en-US" : "hi-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setIsListening(true);
      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const handleTextToSpeech = (text: string, lang: string) => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "english" ? "en-US" : "hi-IN";
      speechSynthesisRef.current.speak(utterance);
    }
  };

  const languages = [
    { value: "english", label: "English 🏰" }, // Castles for UK history
    { value: "spanish", label: "Spanish 🪅" }, // Piñata, festive and colorful
    { value: "french", label: "French 🥖" }, // Baguette for French culture
    { value: "german", label: "German 🍺" }, // Beer, often associated with Germany
    { value: "italian", label: "Italian 🍝" }, // Pasta, Italian cuisine
    { value: "portuguese", label: "Portuguese 🏖️" }, // Beaches, symbolizing Portugal
    { value: "russian", label: "Russian 🪆" }, // Matryoshka dolls
    { value: "chinese", label: "Chinese 🐉" }, // Dragon, Chinese symbolism
    { value: "japanese", label: "Japanese 🎌" }, // Japan's national flag emoji
    { value: "korean", label: "Korean 🥢" }, // Chopsticks for Korean cuisine
    { value: "arabic", label: "Arabic 🕌" }, // Mosque, Middle Eastern culture
    { value: "hindi", label: "Hindi 🪔" }, // Diya, Indian cultural representation
    { value: "bengali", label: "Bengali 🐅" }, // Bengal tiger, national symbol of Bangladesh
    { value: "urdu", label: "Urdu 🕌" }, // Mosque, culturally relevant
    { value: "indonesian", label: "Indonesian 🏝️" }, // Tropical islands, representing Indonesia
    { value: "turkish", label: "Turkish 🧿" }, // Nazar amulet, Turkish culture
    { value: "thai", label: "Thai 🐘" }, // Elephant, symbol of Thailand
    { value: "swedish", label: "Swedish ❄️" }, // Snowflake for cold weather in Sweden
    { value: "dutch", label: "Dutch 🌷" }, // Tulip, symbol of the Netherlands
    { value: "greek", label: "Greek 🏛️" }, // Parthenon, Greek culture
    { value: "polish", label: "Polish 🥟" }, // Pierogi, traditional Polish food
    { value: "vietnamese", label: "Vietnamese 🍜" }, // Pho, traditional Vietnamese dish
    { value: "hebrew", label: "Hebrew 🕎" }, // Menorah, symbol of Jewish culture
    { value: "filipino", label: "Filipino 🇵🇭" }, // Flag of the Philippines
    { value: "malay", label: "Malay 🌴" }, // Palm tree, tropical Malaysia
  ];

  const handleTranslate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const output = await fetch(
        `https://translator.subha9-5roy350-40b.workers.dev/?t=${inputText}&s=${inputLanguage}&l=${outputLanguage}`
      );
      const data = await output.json();
      setOutputText(data.translated_text);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to translate text.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-rose-200/50 dark:to-rose-900/20 flex flex-col transition-colors duration-200">
      <div className="flex-grow flex flex-col p-4 md:p-6 relative overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-5xl space-y-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="h-7 w-7 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m5 8 6 6" />
                <path d="m4 14 6-6 2-3" />
                <path d="M2 5h12" />
                <path d="M7 2h1" />
                <path d="m22 22-5-10-5 10" />
                <path d="M14 18h6" />
              </svg>
              <span className="text-xl ml-1.5 font-medium text-primary">
                MVP{" "}
                <span className="text-secondary-foreground ml-1">
                  Translate
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/subhadeeproy3902/ai-translator">
                <Button
                  size="icon"
                  className="rounded-full border-transparent bg-transparent hover:bg-secondary/5 shadow-md shadow-primary"
                  onClick={toggleTheme}
                >
                  <Github className="h-5 w-5 text-primary" />
                </Button>
              </Link>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-2 items-stretch">
            <div className="flex flex-col gap-4">
              <Select value={inputLanguage} onValueChange={setInputLanguage}>
                <SelectTrigger className="w-full bg-secondary">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-grow">
                <Textarea
                  className="min-h-[200px] absolute h-full resize-none pb-16 bg-secondary/30 rounded-lg"
                  placeholder="Enter text to translate..."
                  value={inputText}
                  onChange={handleInputChange}
                />
                <div className="absolute border-b border-l border-r border-border bg-secondary w-full bottom-0 flex justify-between items-center p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={loading}
                      onClick={handleVoiceInput}
                    >
                      <Mic
                        className={`h-4 w-4 ${
                          isListening ? "text-rose-500" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={loading}
                      onClick={() =>
                        handleTextToSpeech(inputText, inputLanguage)
                      }
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {inputText.length} chars / {getWordCount(inputText)} words
                  </div>
                </div>
              </div>
            </div>

            <Button
                size="icon"
                variant="outline"
                disabled={loading}
                onClick={handleLanguageSwap}
                className="rounded-full w-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-10 bg-background transition-colors duration-200 shadow-sm"
              >
                <ArrowLeftRight className="h-5 w-5 text-primary" />
              </Button>

            <div className="flex flex-col gap-4">
              <Select value={outputLanguage} onValueChange={setOutputLanguage}>
                <SelectTrigger className="w-full bg-secondary">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-grow border-border">
                <Textarea
                  className="min-h-[200px] absolute h-full resize-none pb-16 bg-secondary/30 rounded-lg"
                  placeholder="Translation"
                  value={outputText}
                  readOnly
                />
                <div className="absolute bg-secondary w-full bottom-0 flex justify-between items-center p-3 rounded-lg border-b border-l border-r border-border">
                  <div className="left-3 flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={loading}
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={loading}
                      onClick={() =>
                        handleTextToSpeech(outputText, outputLanguage)
                      }
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {outputText.length} chars / {getWordCount(outputText)} words
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleTranslate}
              disabled={loading}
            >
              Translate{" "}
              {loading && <Loader2 className="h-5 w-5 ml-2 animate-spin" />}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleClearText}
              disabled={loading}
              className="bg-secondary"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
