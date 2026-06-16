# Fontes da marca — Pardal Wedding Films

A marca usa duas fontes do Canva (proprietárias — **não** incluídas no repositório):

- **Eglen** (display / títulos) — coleção "Wedding Sessions"
- **Codec Pro** (corpo de texto / navegação)

## Como ativar

1. Exporte (ou obtenha do designer) os arquivos `.woff2` das fontes.
2. Coloque-os nesta pasta com **exatamente** estes nomes:

```
public/fonts/Eglen.woff2
public/fonts/CodecPro-Regular.woff2
public/fonts/CodecPro-Medium.woff2
public/fonts/CodecPro-Bold.woff2
```

3. Pronto — as declarações `@font-face` em `src/styles/fonts.css` já apontam
   para esses caminhos. O navegador vai trocar dos fallbacks (Cormorant Garamond +
   Manrope) para as fontes oficiais automaticamente.

## Enquanto isso

O site renderiza com fallbacks elegantes:

- Display: `"Cormorant Garamond", "EB Garamond", Georgia, serif`
- Body: `"Manrope", "Inter", system-ui, sans-serif`

Ambos os fallbacks são carregados via `@fontsource` no `src/main.tsx`.
