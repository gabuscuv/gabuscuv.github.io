{
  description = "Next.js + Yarn dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        nodejs = pkgs.nodejs_24; # or nodejs_18 if needed
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            pkgs.corepack_24
          ];

          shellHook = ''
            corepack enable
            echo "🚀 Next.js dev environment ready"
            node -v
            yarn -v
          '';
        };
      }
    );
}