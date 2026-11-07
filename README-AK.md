# Integra Saúde — LP Dra. Larissa

**Cliente:** Integra Saúde · Dra. Larissa Pires Barbosa (Cirurgia e Traumatologia Bucomaxilofacial)
**Cidade:** Teresina/PI (Av. Universitária, 750, Bairro de Fátima)
**Objetivo:** levar ao WhatsApp (86) 99990-8713 com mensagem pré-preenchida (pacientes e, em bloco próprio, dentistas que encaminham casos)

## Stack

HTML e CSS puros, animações com GSAP + ScrollTrigger locais em `assets/js/`, fontes locais em `assets/fonts/`.
Sem framework, sem bundler, sem build. O export já veio sem o runtime do Claude Design (sem `support.js` nem React).

```
index.html            página
assets/css/style.css  cópia de referência (o CSS ativo está inline no index.html)
assets/js/            main.js, gsap.min.js, ScrollTrigger.min.js
assets/fonts/         Instrument Serif e Figtree (woff2)
assets/img/           fotos, logo e og.jpg (1200×630)
favicon.*, apple-touch-icon.png
vercel.json           clean URLs + cache de assets
```

## Deploy — Vercel

Import do repo · Framework Preset **Other** · Root Directory na raiz ·
sem Build/Install Command, sem Output Directory.

## Edições sobre o exportado

- Origem: `integra-saude-lps.zip`, pasta `lp-larissa/` (projeto "Larissa-cor" no Claude Design). O zip juntava as duas LPs em um repo; aqui cada LP é um repo, conforme o padrão AK.
- `<head>`: adicionados `canonical`, `og:url`, `og:image` absoluta com dimensões, `twitter:title`, `twitter:description` e `twitter:image`.
- Adicionados `vercel.json`, `.gitignore` e este README.
- Atualização pelo `integra-saude-lpsatt.zip`: nova imagem `perfil-mandibula.webp` no card do topo, barra fixa de WhatsApp no mobile e ajustes na animação do logo e no traçado de fundo.
- `style.css` e `main.js` referenciados com `?v=` no `index.html`: `/assets/` tem cache imutável de 1 ano, então sem isso quem já abriu a página continuaria com os arquivos antigos. Trocar o valor de `?v=` a cada mudança nesses arquivos.
- **Performance (07/11/2026):** CSS inline no `<head>` (sai a requisição que bloqueava a renderização; `assets/css/style.css` ficou só como cópia de referência, **editar o CSS dentro do `index.html`**); imagens com `srcset`/`sizes` e variantes `-400`/`-640`/`-960.webp` geradas dos originais (qualidade 80); foto do topo com `fetchpriority="high"` e `preload`; preload da fonte do título; `ScrollTrigger.refresh()` agrupado em vez de um por imagem carregada; traçado de fundo medido depois do primeiro frame e resize agrupado por frame.
- Fora o acima, visual, layout, copy, CSS e JS como vieram do zip.

## Pendências

- **URL real da Vercel / domínio:** trocar o placeholder `https://integra-saude-lp-larissa.vercel.app/` em `canonical`, `og:url`, `og:image` e `twitter:image`, se a URL final for outra.
- **GTM / Meta Pixel:** colar entre os comentários `TRACKING HEAD` e `TRACKING BODY` do `index.html`. O clique em link de WhatsApp já dispara `dataLayer.push({event:'clique_whatsapp'})`, `fbq('track','Lead')` e `gtag('event','generate_lead')`, se existirem.
- **Copy:** validação pela Dra. Larissa.
- **WhatsApp:** testar o número em um aparelho real.

Última atualização: 07/11/2026
