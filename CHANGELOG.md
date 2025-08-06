# Changelog

All notable changes to this Tetris Game project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## [1.5.0] - 2025-01-08

### Added
- **GitHub リポジトリセットアップ**
  - MIT ライセンス追加
  - package.json によるプロジェクト情報管理
  - .gitignore による適切なファイル除外
  - docs/ フォルダ構造の整備
- **包括的ドキュメント**
  - CONTRIBUTING.md: 貢献ガイドライン
  - DEPLOYMENT.md: デプロイメント手順
  - 更新されたREADME.md with GitHub Pages リンク
- **プロジェクト管理機能**
  - GitHub Issues テンプレート対応
  - リポジトリ情報の統一
  - GitHub Pages 対応準備

### Changed
- リポジトリ名を「kiro-Tetris」に変更
- 全ドキュメントのURL更新
- プロジェクト構造の標準化

### Technical
- Git リポジトリの適切な初期化
- GitHub との連携設定完了
- 継続的インテグレーション準備

## [1.4.1] - 2025-01-08

### Fixed
- 2人プレイモードでゲームが開始できない問題を修正
  - HTMLとJavaScriptのID不一致を解決
  - キャンバス要素の取得エラーを修正
  - プレイヤーIDの変換処理を追加（player1→p1, player2→p2）
- エラーハンドリングの改善
  - キャンバス要素が見つからない場合の適切なエラー表示
  - コンソールログによるデバッグ情報の追加

### Improved
- 2人プレイモードの安定性向上
- デバッグ機能の強化

## [1.4.0] - 2025-01-08

### Added
- **2人対戦モード**の実装
  - 横並びレイアウトでの同時プレイ
  - 独立したゲームインスタンス（Player 1 & Player 2）
  - 勝者判定システム
  - 同時リスタート・ポーズ機能
- **ゲームモード選択画面**
  - 1 Player / 2 Players 切り替えボタン
  - モード別UI表示切り替え
- **2人プレイ専用操作システム**
  - Player 1: WASD + Q キー操作
  - Player 2: 矢印キー + Space キー操作
  - キーバインドの競合回避
- **VSモード専用UI**
  - 中央に「VS」表示
  - 各プレイヤーの独立スコア表示
  - 勝者表示機能
  - VSモード専用コントロールボタン

### Added - Technical Features
- GameManagerクラスによるモード管理
- 複数ゲームインスタンスの同期制御
- テーマシステムの2人プレイ対応
- VSモード専用レスポンシブデザイン

### Changed
- ゲーム構造をシングルトンからマルチインスタンス対応に変更
- テーマセレクターを共通エリアに移動
- レイアウト構造の最適化

### Improved
- モジュラー設計による拡張性向上
- 独立したゲーム状態管理
- 効率的なイベント処理

## [1.3.0] - 2025-01-08

### Added
- 完全なレスポンシブデザイン対応
  - デスクトップ大画面 (1200px+) サポート
  - デスクトップ中画面 (992-1199px) サポート
  - タブレット横向き (768-991px) サポート
  - タブレット縦向き (576-767px) サポート
  - スマートフォン (575px以下) サポート
  - 極小画面 (400px以下) サポート
  - 横向き表示 (landscape) 対応
- 画面サイズに応じたキャンバスサイズ自動調整
- グリッドレイアウトによる情報表示最適化（タブレット・スマホ）
- モバイルファーストデザインの実装

### Changed
- ゲームコンテナの最大幅を1200pxに制限
- 各画面サイズでの要素配置順序を最適化
- ボタンサイズとフォントサイズの段階的調整
- 余白とギャップの画面サイズ別最適化

### Improved
- タッチ操作の使いやすさを大幅向上
- 片手操作を考慮したレイアウト設計
- 縦向き・横向き両方での快適なプレイ体験

## [1.2.0] - 2025-01-08

### Added
- 画面上操作ボタンの実装
  - 左右移動ボタン (← →)
  - ソフトドロップボタン (↓)
  - 回転ボタン (↻)
  - ハードドロップボタン (⬇)
  - ポーズボタン (⏸)
- タッチ操作対応
- ボタンのホバー・アクティブ状態アニメーション
- テーマ別ボタンスタイリング

### Changed
- モバイルデバイスでの操作性を大幅改善
- ゲームレイアウトにコントロールボタン領域を追加

### Improved
- キーボード操作とボタン操作の併用可能
- ゲーム状態（ポーズ・ゲームオーバー）を考慮したボタン動作

## [1.1.0] - 2025-01-08

### Added
- 3つのカラーテーマシステム
  - ダークテーマ（デフォルト）: クラシックな暗色背景
  - ライトテーマ: 明るく上品な色合い
  - ギャルテーマ: ピンク・ゴールド系でキラキラエフェクト
- テーマセレクター UI
- テーマ別のテトリミノカラーパレット
- リアルタイムテーマ切り替え機能

### Added - Visual Effects
- ギャルテーマ専用のグロー効果
- スパークルアニメーション
- テーマ切り替え時のスムーズトランジション

### Changed
- 全UI要素がテーマに連動するよう更新
- キャンバス背景色のテーマ対応
- 次のピースプレビューのテーマ対応

## [1.0.0] - 2025-01-08

### Added - Core Game Features
- 完全なテトリスゲームプレイ機能
- 7種類のテトリミノ（I, O, T, S, Z, J, L）
- テトリミノの移動、回転、ドロップ機能
- ライン消去システム
- スコア計算システム
- レベルアップ機能（10ライン毎）
- 落下速度の段階的増加

### Added - Game Interface
- HTML5 Canvas によるゲーム描画
- 次のピースプレビュー機能
- スコア、レベル、ライン数の表示
- ゲームオーバー画面
- リスタート機能

### Added - Controls
- キーボード操作サポート
  - 矢印キー: 移動・回転・ソフトドロップ
  - スペースキー: ハードドロップ
  - Pキー: ポーズ/再開
- ポーズ機能

### Added - Visual Design
- モダンなグラデーション背景
- ゴールドアクセントカラー
- ボックスシャドウとボーダーラディウス
- レスポンシブレイアウト（基本対応）

### Added - Technical Features
- JavaScript ES6+ クラス構文
- 60FPS ゲームループ
- 衝突検出システム
- ランダムピース生成
- ゲーム状態管理

### Added - Documentation
- README.md with comprehensive game information
- 日本語での操作説明
- ゲームルールとスコアシステムの説明
- 技術仕様とブラウザ対応情報

---

## Development Notes

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Graphics**: HTML5 Canvas API
- **Architecture**: Object-Oriented Programming
- **Responsive**: CSS Media Queries
- **Animation**: CSS Transitions & Keyframes

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- 60FPS game loop using requestAnimationFrame
- Efficient collision detection algorithm
- Optimized canvas rendering

### Code Quality
- Clean, readable code structure
- Comprehensive error handling
- Modular design patterns
- Consistent naming conventions