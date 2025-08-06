# Changelog

All notable changes to this Tetris Game project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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