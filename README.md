# 🏷️ Dynamic Arrow Badge Generator

A customizable dynamic SVG badge generator in the shape of an arrow, perfect for your GitHub profiles, repositories, or Obsidian notes. The badge automatically adapts its width to the length of the text provided and prevents the stroke from being clipped at any thickness.

## 🚀 Quick Start

Simply use the URL of your deployed application inside your Markdown markup:

<img src="https://text-arrow.vercel.app/badge?text=Read%20more&color=2a2a2a&stroke=000000&weight=2" width="30%">

---

## 🛠️ Query Parameters

You can customize the appearance of your badge directly through the URL by combining the following parameters:

| Parameter | Description | Default Value | Example |
| --- | --- | --- | --- |
| `text` | The text to display on the badge. Use URL encoding for spaces (`%20`). | `Читать далее` | `?text=GitHub%20Stars` |
| `color` | The main background color in HEX format (without `#`). The top gradient color is automatically calculated (+10% brightness). | `2a2a2a` (Dark Gray) | `?color=ff5500` |
| `stroke` | The border/stroke color of the badge in HEX format (without `#`). | `000000` (Black) | `?stroke=ffffff` |
| `weight` | The thickness of the border stroke in pixels. The canvas dynamically expands to prevent edge clipping. | `2` | `?weight=4` |

---

## 🎨 Examples

### 1. GitHub Dark Style (Standard)

<img src="https://text-arrow.vercel.app/badge?text=View%20Repository&color=24292e&stroke=444d56&weight=2" width="30%">

### 2. Vibrant Orange with Thick White Border

<img src="https://text-arrow.vercel.app/badge?text=Warning!&color=ff5500&stroke=ffffff&weight=4" width="30%">

### 3. Success Badge (Green with Dark Border)

<img src="https://text-arrow.vercel.app/badge?text=Release%20Passing&color=2ecc71&stroke=27ae60&weight=3" width="30%">

### 4. Borderless Look (Stroke color matches background)

<img src="https://text-arrow.vercel.app/badge?text=Plain%20Text&color=0076ff&stroke=0076ff" width="30%">

---

## 💡 Integration Details

* **URL Encoding:** If your text contains spaces or special characters, make sure to use URL encoding (e.g., a space becomes `%20`).
* **Caching:** Built-in server caching (`s-maxage=86400`) ensures that the Vercel Edge Network delivers images instantly without re-rendering them on every page view.
* **Obsidian Support:** These badges work flawlessly inside your local notes since Obsidian fully supports standard Markdown image syntax.
