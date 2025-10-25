import React from "react";
import { Link } from "react-router-dom";
import LayoutWrapper from "../components/LayoutWrapper";
import Button from "../components/Button";

const About: React.FC = () => {
  return (
    <LayoutWrapper>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Carbon Credit Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track, mint, verify, and trade carbon credit NFTs on the Algorand
            blockchain. Bringing transparency and accessibility to carbon
            offsetting.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              🎯 Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe climate action should be transparent, accessible, and
              verifiable. Our platform leverages blockchain technology to make
              carbon credits more trustworthy and easier to trade, enabling
              individuals and organizations to participate in meaningful climate
              solutions.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ⚡ Why Blockchain?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Blockchain technology provides immutable records of carbon credit
              creation, transfer, and verification. This eliminates fraud, double
              counting, and ensures complete transparency. Every transaction is
              permanently recorded on the Algorand network.
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔨",
                title: "Mint Credits",
                desc: "Create carbon credit NFTs backed by verified sustainability projects",
              },
              {
                icon: "🎫",
                title: "Own & Hold",
                desc: "Store your carbon credits in your Algorand wallet",
              },
              {
                icon: "✓",
                title: "Verify",
                desc: "Check authenticity and metadata of any carbon credit",
              },
              {
                icon: "🔄",
                title: "Trade",
                desc: "Transfer credits peer-to-peer across the Algorand network",
              },
              {
                icon: "📊",
                title: "Track",
                desc: "Monitor your carbon offset impact and transaction history",
              },
              {
                icon: "☁️",
                title: "Decentralized",
                desc: "All data and metadata stored on IPFS for permanence",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-card text-card-foreground hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="p-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Built With Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "React", icon: "⚛️" },
              { name: "TypeScript", icon: "📘" },
              { name: "TailwindCSS", icon: "🎨" },
              { name: "Algorand", icon: "⛓️" },
              { name: "IPFS", icon: "��" },
              { name: "Vite", icon: "⚡" },
              { name: "Router", icon: "🗺️" },
              { name: "Context API", icon: "🔄" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-card text-card-foreground border border-border"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-sm font-medium text-foreground text-center">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team/Credits */}
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Built By Innovators
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This application is powered by Builder.io, a platform for creating
              AI-generated, production-ready code. Built with modern web
              technologies and climate action in mind.
            </p>
          </div>

          {/* Logos */}
          <div className="flex items-center justify-center gap-8">
            <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
              <p className="text-sm font-semibold text-foreground">
                Built with
              </p>
              <a
                href="https://www.builder.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm mt-1 block"
              >
                Builder.io →
              </a>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
              <p className="text-sm font-semibold text-foreground">
                Running on
              </p>
              <a
                href="https://algorand.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm mt-1 block"
              >
                Algorand →
              </a>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
              <p className="text-sm font-semibold text-foreground">
                Storage via
              </p>
              <a
                href="https://ipfs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm mt-1 block"
              >
                IPFS →
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 p-8 rounded-lg bg-primary/10 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to Make an Impact?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start minting and trading carbon credits today. Take action on
            climate change with blockchain-verified transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/mint">
              <Button variant="primary" size="lg">
                Mint Your First Credit
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Learn More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://algorand.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">
                Algorand Documentation →
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn about the Algorand blockchain and its ecosystem
              </p>
            </a>
            <a
              href="https://ipfs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">
                IPFS Documentation →
              </h3>
              <p className="text-sm text-muted-foreground">
                Understand decentralized file storage with IPFS
              </p>
            </a>
            <a
              href="https://www.builder.io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">
                Builder.io Platform →
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover how AI and code generation work
              </p>
            </a>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default About;
