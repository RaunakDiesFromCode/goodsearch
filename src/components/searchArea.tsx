"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useTranslatePrompt from "@/hooks/useTranslate";
import { Send } from "lucide-react";
import React, { useState } from "react";
import Loading from "./Loading";
import { FaCheck, FaCopy, FaGoogle } from "react-icons/fa";
import { BsBing } from "react-icons/bs";
import { FaWandMagicSparkles } from "react-icons/fa6";

const SearchArea = () => {
  const [inputValue, setInputValue] = useState("");
  const { response, generatePrompt } = useTranslatePrompt();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await generatePrompt(inputValue);
    setLoading(false);
  };

  return (
    <div className="w-screen h-[90vh] flex flex-col items-center justify-center transition-all duration-100">
      <div className="mb-16 text-center">
        <div className="text-6xl font-extrabold ">
          Don&apos;t know what to{" "}
          <span className="dark:text-red-400 text-blue-500 m-0 p-0">
            Search
          </span>{" "}
          for?
        </div>
        <div className="text-lg font-semibold text-foreground/70">
          Type below what you want and we will tell you what to search on the
          web
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center w-full max-w-lg">
        <Card className="p-1 rounded-3xl bg-foreground/5 outline-foreground/70 shadow-2xl shadow-foreground/10 w-full">
          <form onSubmit={handleSubmit} className="flex items-end">
            <textarea
              placeholder="Just ask! (min 10 characters)"
              value={inputValue}
              className="w-full min-h-16 outline-none max-h-32 mt-1 ml-2 bg-transparent resize-none"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              disabled={inputValue.length < 10 || loading}
              type="submit"
              className="p-3 ml-1 rounded-full"
            >
              <Send />
            </Button>
          </form>
        </Card>

        {(loading || response) && (
          <div className="flex flex-col gap-1 w-full">
            <Card
              className={`p-3 text-center rounded-3xl w-full bg-foreground/5 outline-foreground/70 shadow-2xl shadow-foreground/10 transition-all duration-300 ${
                loading ? "h-20" : "max-h-[50vh] overflow-y-auto"
              }`}
            >
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {response}
                  <div className="flex w-full gap-1 justify-center mt-3">
                    <Button
                      variant={"outline"}
                      className="rounded-full p-0 m-0 px-3 opacity-40 hover:opacity-80 transition-all duration-200"
                      onClick={() => {
                        navigator.clipboard.writeText(response);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                    </Button>
                    <Button
                      variant={"outline"}
                      className="rounded-full p-0 m-0 px-3 opacity-40 hover:opacity-80 transition-all duration-200"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/search?q=${response}`
                        );
                      }}
                    >
                      <FaGoogle />
                    </Button>
                    <Button
                      variant={"outline"}
                      className="rounded-full p-0 m-0 px-3 opacity-40 hover:opacity-80 transition-all duration-200"
                      onClick={() => {
                        window.open(
                          `https://www.bing.com/search?q=${response}`
                        );
                      }}
                    >
                      <BsBing />
                    </Button>
                    <Button
                      variant={"outline"}
                        className="rounded-full p-0 m-0 px-3 opacity-40 hover:opacity-80 transition-all duration-200"
                        onClick={() => {
                          window.open(
                            `/ask/${response}`
                          );
                        }
                      }
                    >
                      <FaWandMagicSparkles />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchArea;
