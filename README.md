# 🎮 Tetris Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue)](https://masatamo-aws.github.io/kiro-Tetris)

HTML5 Canvas と JavaScript で作られたクラシックなテトリスゲームです。

## 🚀 [Live Demo](https://masatamo-aws.github.io/kiro-Tetris)

![Tetris Game Screenshot](https://via.placeholder.com/800x400/000000/FFFFFF?text=Tetris+Game+Screenshot)

## ✨ 特徴

- 🎮 **完全なテトリスゲームプレイ**
- 👥 **1人プレイ & 2人対戦モード**
- 🧩 **7種類のテトリミノ**（I, O, T, S, Z, J, L）
- 📊 **スコア、レベル、ライン数の表示**
- 👀 **次のピースのプレビュー**
- 🎨 **3つのカラーテーマ**（ダーク、ライト、ギャル）
- 🎵 **BGM機能**（音量調整・ON/OFF切り替え）
- 📺 **背景テロップ**（カスタムテキストのスクロール表示）
- 🕹️ **画面上操作ボタン**（タッチ操作対応）
- 📱 **完全レスポンシブデザイン**（PC・タブレット・スマホ対応）
- 🔄 **ゲームオーバー時のリスタート機能**
- 💾 **設定の自動保存**（localStorage使用）

## ゲームモード

### 🎮 1人プレイモード
- クラシックなテトリス体験
- スコア・レベル・ライン数の記録
- 画面上ボタンまたはキーボード操作

### 👥 2人対戦モード
- 💻 **デスクトップ**: 左右並びで同時プレイ
- 📱 **モバイル**: 縦並びレイアウトで快適プレイ
- 📊 **独立したスコア・レベル・ライン数**
- 🏆 **どちらかがゲームオーバーになると勝者決定**
- 🔄 **同時リスタート・ポーズ機能**
- 🕹️ **各プレイヤー専用の操作ボタン**

## カラーテーマ

ゲーム画面上部のテーマセレクターで3つのテーマから選択できます：

### 🌙 ダーク（デフォルト）
- クラシックな暗色背景
- 鮮やかなテトリミノカラー
- 従来のテトリス風デザイン

### ☀️ ライト
- 明るく上品な背景
- パステル調の優しい色合い
- 目に優しいデザイン

### ✨ ギャル
- ピンク・ゴールド系のゴージャスな配色
- キラキラエフェクト付き
- グロー効果でキュートに
- 背景テロップの色相変化アニメーション

## 操作方法

### 🎮 1人プレイモード
**キーボード操作:**
- **← →** : ピースの左右移動
- **↓** : ソフトドロップ（落下速度アップ）
- **↑** : ピースの回転
- **Space** : ハードドロップ（一気に落下）
- **P** : ポーズ/再開

**画面上ボタン操作:**
- 🖱️ **タッチ・クリック**で直感的な操作が可能
- 📱 **モバイルデバイス**での快適なプレイ体験
- 🎮 **ゲームパッド風**のボタンレイアウト

### 👥 2人対戦モード
**Player 1 (左側):**
- **W** : 回転
- **A D** : 左右移動
- **S** : ソフトドロップ
- **Q** : ハードドロップ

**Player 2 (右側):**
- **↑** : 回転
- **← →** : 左右移動
- **↓** : ソフトドロップ
- **Space** : ハードドロップ

**画面上ボタン操作（各プレイヤー専用）:**
- 🕹️ **Player 1**: W(回転), A/D(移動), S(ソフトドロップ), Q(ハードドロップ)
- 🕹️ **Player 2**: ↑(回転), ←/→(移動), ↓(ソフトドロップ), Space(ハードドロップ)

**共通操作:**
- ⏸️ **中央の「Pause」ボタン**: 両プレイヤー同時ポーズ
- 🔄 **中央の「Restart Game」ボタン**: 両プレイヤー同時リスタート

## 🎵 オーディオ・エフェクト機能

### 🎶 BGM機能
- **🎵 BGM: ON/OFF**: ワンクリックでBGMの切り替え
- **🔊 音量調整**: スライダーで0-100%の音量調整
- **💾 設定保存**: 音量とON/OFF設定を自動保存
- **⏸️ ポーズ連動**: ゲームポーズ時にBGMも一時停止

### 📺 背景テロップ機能
- **📺 Telop: ON/OFF**: 背景テロップの表示切り替え
- **🌈 テーマ連動**: 各テーマに合わせた色とエフェクト
- **📱 レスポンシブ**: 画面サイズに応じたフォントサイズ調整
- **🎨 ギャルテーマ特別効果**: 虹色変化アニメーション

### 🎨 その他
- **🎨 テーマセレクター**: カラーテーマの変更
- **🔄 モード切り替えボタン**: 1人プレイ ⇔ 2人対戦

## ゲームルール

1. 上から落ちてくるテトリミノを操作して、横一列を埋める
2. 横一列が埋まるとその行が消去され、スコアが加算される
3. 10ライン消去するごとにレベルが上がり、落下速度が速くなる
4. ピースが上まで積み上がるとゲームオーバー

## スコアシステム

- 1ライン消去: 100 × レベル
- 複数ライン同時消去でボーナス
- レベルが上がるほど高得点

## 技術仕様

- **HTML5 Canvas** でのレンダリング
- **JavaScript ES6+** クラス構文
- **CSS3** アニメーションとレスポンシブデザイン
- 60FPS でのスムーズなゲームプレイ

## 📁 ファイル構成

```
kiro-tetris/
├── index.html              # メインHTML
├── style.css               # スタイルシート
├── tetris.js               # ゲームロジック
├── assets/
│   └── audio/
│       └── bgm.wav         # BGM音源ファイル
├── docs/
│   ├── CONTRIBUTING.md     # 貢献ガイド
│   └── DEPLOYMENT.md       # デプロイメントガイド
├── LICENSE                 # MITライセンス
├── package.json            # プロジェクト情報
├── CHANGELOG.md            # 変更履歴
└── README.md               # このファイル
```

## 実行方法

1. ファイルをダウンロード
2. `index.html` をブラウザで開く
3. ゲーム開始！

## ブラウザ対応

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details on how to contribute to this project.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Classic Tetris game mechanics
- HTML5 Canvas API
- Modern JavaScript ES6+ features

## 📞 Support

If you have any questions or issues, please [open an issue](https://github.com/masatamo-aws/kiro-Tetris/issues) on GitHub.