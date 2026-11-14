#!/usr/bin/env bash
# 쇼츠 제작 도구 준비(멱등). 모델은 저장소 밖(기본: $SCRATCH/models)에 받는다.
#   bash shorts/tools/setup.sh [모델폴더]
set -e
R="$(cd "$(dirname "$0")/../.." && pwd)"
D="${1:-${SCRATCH:-/tmp}/models}"; mkdir -p "$D"
command -v ffmpeg >/dev/null || { apt-get update -qq && apt-get install -y -qq ffmpeg fonts-noto-cjk >/dev/null; }
[ -d "$R/motion/node_modules/pretendard" ] || (cd "$R/motion" && npm ci --silent)
python3 -c "import sherpa_onnx, soundfile, scipy, fontTools, brotli" 2>/dev/null || pip install -q sherpa-onnx soundfile scipy fonttools brotli
U=https://github.com/k2-fsa/sherpa-onnx/releases/download
[ -d "$D/sherpa-onnx-supertonic-tts-int8-2026-03-06" ] || curl -sSL "$U/tts-models/sherpa-onnx-supertonic-tts-int8-2026-03-06.tar.bz2" | tar xj -C "$D"
[ -d "$D/sherpa-onnx-zipformer-korean-2024-06-24" ] || curl -sSL "$U/asr-models/sherpa-onnx-zipformer-korean-2024-06-24.tar.bz2" | tar xj -C "$D"
echo "TTS=$D/sherpa-onnx-supertonic-tts-int8-2026-03-06"
echo "ASR=$D/sherpa-onnx-zipformer-korean-2024-06-24"
