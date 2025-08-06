# 🎮 Tetris Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue)](https://yourusername.github.io/tetris-game)

HTML5 Canvas と JavaScript で作られたクラシックなテトリスゲームです。

## 🚀 [Live Demo](https://yourusername.github.io/tetris-game)

![Tetris Game Screenshot](https://via.placeholder.com/800x400/000000/FFFFFF?text=Tetris+Game+Screenshot)

## 特徴

- 完全なテトリスゲームプレイ
- **1人プレイ & 2人対戦モード**
- 7種類のテトリミノ（I, O, T, S, Z, J, L）
- スコア、レベル、ライン数の表示
- 次のピースのプレビュー
- **3つのカラーテーマ**（ダーク、ライト、ギャル）
- **画面上操作ボタン**（タッチ操作対応）
- **完全レスポンシブデザイン**（PC・タブレット・スマホ対応）
- ゲームオーバー時のリスタート機能

## ゲームモード

### 🎮 1人プレイモード
- クラシックなテトリス体験
- スコア・レベル・ライン数の記録
- 画面上ボタンまたはキーボード操作

### 👥 2人対戦モード
- 横並びで同時プレイ
- 独立したスコア・レベル・ライン数
- どちらかがゲームオーバーになると勝者決定
- 同時リスタート・ポーズ機能

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

## 操作方法

### 🎮 1人プレイモード
**キーボード操作:**
- **← →** : ピースの左右移動
- **↓** : ソフトドロップ（落下速度アップ）
- **↑** : ピースの回転
- **Space** : ハードドロップ（一気に落下）
- **P** : ポーズ/再開

**画面上ボタン操作:**
- タッチ・クリックで直感的な操作が可能
- モバイルデバイスでの快適なプレイ体験

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

**共通操作:**
- 中央の「Pause」ボタン : 両プレイヤー同時ポーズ
- 中央の「Restart Game」ボタン : 両プレイヤー同時リスタート

### 🎨 その他
- **テーマセレクター** : カラーテーマの変更
- **モード切り替えボタン** : 1人プレイ ⇔ 2人対戦

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

## ファイル構成

```
tetris-game/
├── index.html      # メインHTML
├── style.css       # スタイルシート
├── tetris.js       # ゲームロジック
└── README.md       # このファイル
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

If you have any questions or issues, please [open an issue](https://github.com/yourusername/tetris-game/issues) on GitHub.