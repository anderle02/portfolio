import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type KuudraBotData = {
  serverCount: number | null;
  termsUrl: string | null;
  privacyUrl: string | null;
};

const formatNumber = (value: number) => {
  if (isNaN(value)) return "unknown";
  if (!Number.isInteger(value)) value = Math.floor(value);
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 3,
  }).format(value);
};

function TermsPrivacyLinks({
                             termsUrl,
                             privacyUrl,
                           }: {
  termsUrl: string | null;
  privacyUrl: string | null;
}) {
  if (!termsUrl && !privacyUrl) return null;

  return (
      <p className="text-white mt-2 text-sm">
        {termsUrl && (
            <a
                href={termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
            >
              Terms of Service
            </a>
        )}

        {termsUrl && privacyUrl && <span className="mx-2 text-gray-400">•</span>}

        {privacyUrl && (
            <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>
        )}
      </p>
  );
}

export default function Home() {
  const [data, setData] = useState<KuudraBotData>({
    serverCount: null,
    termsUrl: null,
    privacyUrl: null,
  });

  useEffect(() => {
    fetch("/api/servercount")
        .then((res) => res.json())
        .then((json) =>
            setData({
              serverCount: json.serverCount ?? null,
              termsUrl: json.termsUrl ?? null,
              privacyUrl: json.privacyUrl ?? null,
            })
        )
        .catch(() =>
            setData({
              serverCount: null,
              termsUrl: null,
              privacyUrl: null,
            })
        );
  }, []);

  // Helper component for portfolio images with zoom on click
  const PortfolioImage = ({
                            src,
                            alt,
                          }: {
    src: string;
    alt: string;
  }) => {

    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => setIsZoomed((prev) => !prev);

    const cursorStyle = {
      cursor: isZoomed ? "zoom-out" : "zoom-in",
      transition: "transform 0.3s ease",
      borderRadius: "0.5rem",
    };

    return (
        <>
          {isZoomed ? (
              <div
                  onClick={toggleZoom}
                  className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm overflow-auto"
                  style={{ cursor: "zoom-out" }}
              >
                <img
                    src={src}
                    alt={alt}
                    className="rounded-lg block mx-auto"
                    style={{
                      maxWidth: "none",
                      maxHeight: "none",
                      minWidth: "90vw",
                      minHeight: "90vh",
                      cursor: "zoom-out",
                      userSelect: "none",
                    }}
                />
              </div>
          ) : (
              <img
                  src={src}
                  alt={alt}
                  className="rounded-lg w-full object-cover"
                  style={cursorStyle}
                  onClick={toggleZoom}
              />
          )}
        </>
    );
  };

  return (
      <div
          className="text-white p-6 flex flex-col"
          style={{
            height: "100vh",
            background:
                "linear-gradient(to bottom right,rgb(3, 0, 43) 80%,rgb(248, 66, 157) 20%)",
          }}
      >
        <header className="text-center text-3xl font-bold mb-8">
          Hi, I&#39;m anderle!
        </header>
        <p className="text-center text-lg text-gray-300 mb-8">A little text</p>

        {/* Scrollable container wrapping the grid */}
        <div className="flex-grow overflow-y-auto" style={{ paddingRight: "0.5rem" }}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Attribute Mod Section */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Attribute Mod</h2>
              <p>
                Attribute Mod is a lightweight Forge 1.8.9 Minecraft Mod that
                allows players to easily check attribute prices in Hypixel Skyblock.
                <br />
                The mod offers a tooltip attribute price overlay, a feature-rich
                chest value overlay, and commands such as{" "}
                <code className="bg-gray-600 text-white px-1 py-0.5 rounded inline-block whitespace-nowrap">
                  /attributeprice
                </code>{" "}
                and{" "}
                <code className="bg-gray-600 text-white px-1 py-0.5 rounded inline-block whitespace-nowrap">
                  /attributeupgrade
                </code>
                .
              </p>

              {/* Flex container */}
              <div className="flex mt-4 space-x-4">
                {/* Left: Single Attribute Price Command Image */}
                <div className="flex-1">
                  <PortfolioImage
                      src="/mod_ap.png"
                      alt="Attribute Price Command"
                  />
                </div>

                {/* Right: Video Section and GitHub Stats */}
                <div className="flex-1">
                  <video
                      controls
                      className="rounded-lg w-full h-auto mb-4"
                      preload="metadata"
                  >
                    <source src="/chest_overlay.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* GitHub Stats */}
                  <div className="text-center flex flex-wrap gap-4 justify-center">
                    <a href="https://github.com/anderle02/attributemod/stargazers">
                      <img
                          src="https://img.shields.io/github/stars/anderle02/attributemod?style=social"
                          alt="GitHub Stars"
                      />
                    </a>
                    <a href="https://github.com/anderle02/attributemod/forks">
                      <img
                          src="https://img.shields.io/github/forks/anderle02/attributemod?style=social"
                          alt="GitHub Forks"
                      />
                    </a>
                    <a href="https://github.com/anderle02/attributemod/issues">
                      <img
                          src="https://img.shields.io/github/issues/anderle02/attributemod"
                          alt="GitHub Issues"
                      />
                    </a>
                  </div>

                  {/* Changelog */}
                  <h3 className="text-lg font-semibold mt-4">Changelog</h3>
                  <ul className="list-disc ml-6">
                    <li>Version 1.2.0 - Settings GUI, scrollable overlay, profit/hour</li>
                    <li>Version 1.1.0 - Kuudra Profit Overlay</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kuudra Gang Bot Section */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              {/* Heading */}
              <h2 className="text-xl font-semibold">Kuudra Gang Bot</h2>
              <p className="mb-4">
                A bot for the Kuudra community with various helpful features. Written in{" "}
                <a
                    href="https://www.typescriptlang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                  TypeScript
                </a>{" "}
                using{" "}
                <a
                    href="https://discord.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                  discord.js
                </a>
                . Manages a large{" "}
                <a
                    href="https://www.mongodb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                  MongoDB
                </a>{" "}
                database for synchronizing in-game stats with Discord.
              </p>

              <Link href="/kuudragangbot" className="text-blue-400 mb-4 inline-block">
                Learn More
              </Link>

              {/* Images + Right Text Area */}
              <div className="flex gap-4">
                {/* Left Image */}
                <div className="flex-1">
                  <PortfolioImage
                      src="/apcommand.png"
                      alt="Attribute Price Command"
                  />
                </div>

                {/* Middle Image */}
                <div className="flex-1">
                  <PortfolioImage
                      src="/kuudracommand.png"
                      alt="Kuudra Command"
                  />
                </div>

                {/* Right Text Area */}
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-gray-300">
                    Placeholder space for more text, changelogs, or smaller images in
                    the future.
                  </p>
                  <p className="mt-2 text-white">
                    Currently in{" "}
                    <span className="text-green-400 font-semibold">
                    {data.serverCount !== null ? formatNumber(data.serverCount) : "..."}
                  </span>{" "}
                    servers.
                  </p>
                  <TermsPrivacyLinks termsUrl={data.termsUrl} privacyUrl={data.privacyUrl} />
                </div>
              </div>
            </div>

            {/* New Box 1 */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              {/* Top text - Full width */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Discord Bridge Mod (WIP)</h2>
                <p>
                  A Minecraft Mod written for <strong>Fabric 1.21.5</strong> with the goal to enable deep
                  Discord integration in the Minecraft client. Uses the{" "}
                  <a
                      href="https://docs.oracle.com/javase/1.5.0/docs/guide/jni/spec/intro.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline">
                    Java Native Interface
                  </a> to implement functionality from Discord's new{" "}
                  <a
                      href="https://discord.com/developers/docs/discord-social-sdk/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline">
                    Social SDK
                  </a>.
                </p>
              </div>

              {/* Planned Features and Discord Stats in same section */}
              <div className="flex">
                {/* Planned Features and Discord Stats */}
                <div className="w-2/3">
                  <p><strong>Planned Features</strong></p>
                  <ul>
                    <li><strong>✅ Auth Flow</strong>: When opening the game with the mod installed, automatically open the
                      Discord client and prompt for Authorization. Save the tokens locally.
                    </li>
                    <li><strong>❌ Bridge Chat</strong> for in-game guilds: Without the need of bridge bots, more guilds will
                      be able to connect members with their friends on Discord. No hosting needed, everything is handled by
                      Discord.
                    </li>
                    <li><strong>❌ Game Invites</strong>: Invite and accept others to your party via Discord. The CLI of
                      popular third-party launchers allows launching the game directly from Discord, too.
                    </li>
                  </ul>

                  {/* Discord Stats */}
                  <div className="text-center flex flex-wrap gap-4 justify-center mt-6">
                    <a href="https://github.com/anderle02/discordbridgemod/stargazers">
                      <img
                          src="https://img.shields.io/github/stars/anderle02/discordbridgemod?style=social"
                          alt="GitHub Stars"
                      />
                    </a>
                    <a href="https://github.com/anderle02/discordbridgemod/forks">
                      <img
                          src="https://img.shields.io/github/forks/anderle02/discordbridgemod?style=social"
                          alt="GitHub Forks"
                      />
                    </a>
                    <a href="https://github.com/anderle02/discordbridgemod/issues">
                      <img
                          src="https://img.shields.io/github/issues/anderle02/discordbridgemod"
                          alt="GitHub Issues"
                      />
                    </a>
                  </div>
                </div>

                {/* Right side for images */}
                <div className="w-1/3 pl-4">
                  <img
                      src="/chatmessage.png"
                      alt="Chat Message"
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                  />
                  <img
                      src="/rpc.png"
                      alt="Rich Presence"
                      className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* New Box 2 */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://github.com/anderle02" target="_blank" rel="noopener noreferrer">
              <Image
                  src="/github.png"
                  alt="GitHub"
                  width={40}
                  height={40}
                  className="rounded-full"
              />
            </a>
            <a href="https://discord.gg/kuudra" target="_blank" rel="noopener noreferrer">
              <Image
                  src="/discord.jpg"
                  alt="Discord"
                  width={40}
                  height={40}
                  className="rounded-full"
              />
            </a>
          </div>
        </footer>
      </div>
  );
}
