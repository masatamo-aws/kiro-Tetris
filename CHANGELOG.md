# Changelog

All notable changes to this Tetris Game project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.2] - 2025-01-08

### Fixed
- **ゲーム画面重複表示問題の修正**
  - 1playerモードで2画面表示される問題を解決
  - 2playerモードで3画面表示される問題を解決
  - HTML構造の階層エラーを修正
  - 各要素を適切なコンテナ内に正しく配置

### Improved
- **HTML構造の最適化**
  - 1playerモード: game-container内に全要素を統合
  - 2playerモード: player-section構造の正規化
  - player-contentとgame-controls-vsの適切な配置
  - 開始・終了タグの整合性確保

### Technical
- HTML階層構造の完全な再構築
- 各ゲームモードでの正確な画面数表示
- レスポンシブデザインとの互換性維持

## [1.6.1] - 2025-01-08

### Fixed
- **背景テロップ文字色の修正**
  - ダークテーマ: 白色文字に統一
  - ライトテーマ: 黒色文字に変更（視認性向上）
  - ギャルテーマ: 黒色文字に変更（ピンクグロー効果維持）
  - 各テーマでの適切なtext-shadow調整

### Improved
- **背景テロップレスポンシブデザイン強化**
  - 10段階の詳細なブレークポイント対応
  - 大画面デスクトップ (1400px+): 28px, 140秒
  - 中画面デスクトップ (1200-1399px): 26px, 130秒
  - 小画面デスクトップ (992-1199px): 22px, 110秒
  - タブレット横向き (768-991px): 20px, 100秒
  - タブレット縦向き (576-767px): 18px, 90秒
  - スマートフォン大 (480-575px): 16px, 85秒
  - スマートフォン中 (400-479px): 14px, 80秒
  - スマートフォン小 (320-399px): 12px, 75秒
  - 極小画面 (320px未満): 10px, 70秒
- **横向き表示対応**
  - landscape orientationでの最適化
  - 高さ制限時の自動フォントサイズ調整
- **ゲーム中透明度の最適化**
  - 各テーマでの視認性バランス改善
  - ゲームプレイ時の適切な背景表示

### Changed
- テロップ透明度をテーマ別に微調整
- スクロール速度の画面サイズ連動強化

## [1.6.0] - 2025-01-08

### Added
- **BGM機能**の実装
  - AudioManagerクラスによるBGM制御
  - BGMトグルボタン（🎵 BGM: ON/OFF）
  - 音量スライダー（0-100%調整）
  - ポーズ時のBGM一時停止機能
  - localStorage による設定保存・復元
  - ユーザーインタラクション後の自動BGM開始（ブラウザポリシー対応）
- **背景テロップ機能**の実装
  - カスタムテキストの横スクロール表示
  - テロップトグルボタン（📺 Telop: ON/OFF）
  - テーマ別テロップスタイリング
  - ギャルテーマ専用色相変化アニメーション
  - レスポンシブ対応（画面サイズ別フォントサイズ・速度調整）
  - ゲーム中の自動透明度調整
- **2playerモード専用操作ボタン**
  - 各プレイヤー専用の画面上操作ボタン
  - Player 1: W/A/S/D/Q ボタン
  - Player 2: ↑/←/↓/→/Space ボタン
  - VSモード専用ボタンスタイリング
  - タッチ・クリック操作対応

### Added - Audio & Visual Features
- WAV形式BGMファイル対応（assets/audio/bgm.wav）
- テーマ連動オーディオコントロールUI
- 背景テロップのスムーズスクロールアニメーション
- VSモード用コンパクトボタンデザイン

### Fixed
- **2playerモードレスポンシブデザイン**の修正
  - デスクトップでの左右並びレイアウト実装
  - player-sectionとvs-centerの適切な配置
  - レスポンシブブレークポイントの最適化
  - モバイルでの縦並びレイアウト改善
- **2playerモード画面バグ**の修正
  - 1playerモード画面が表示される問題を解決
  - player-contentラッパーによる構造改善
  - 各プレイヤーの操作ボタン配置修正

### Changed
- オーディオコントロールセクション名を「Audio & Effects」に変更
- 2playerモードのレイアウト構造を大幅改善
- VSモード用の独立したCSS設計

### Improved
- デスクトップでの2playerモード体験向上
- モバイルデバイスでの2人プレイ操作性改善
- BGMとテロップの統合制御システム
- 設定の永続化による使いやすさ向上