# LP Dra. Larissa Pires (v2)

**Cliente:** Integra Saúde · Dra. Larissa Pires Barbosa (Cirurgia e Traumatologia Bucomaxilofacial)
**Cidade:** Teresina/PI (Av. Universitária, 750, Bairro de Fátima)
**Objetivo:** levar ao WhatsApp (86) 99990-8713 com mensagem pré-preenchida

## Stack

Site estático: HTML, CSS e JS só para as animações. Sem framework, sem bundler, sem build.

```
index.html            página (desktop e mobile no mesmo arquivo)
assets/css/style.css  estilos, com fontes self-hosted (Montserrat + Playfair Display)
assets/js/            gsap.min.js e ScrollTrigger.min.js (3.12.5), main.js (animações, mascote, quiz, carrossel, mapa e rastreamento)
assets/img/           fotos, carrossel, tiles do mapa (z15–z18) e og.jpg (1200×630)
favicon.*, apple-touch-icon.png
vercel.json           clean URLs + cache imutável em /assets/
```

## Deploy — Vercel

Projeto `integra-saude-lp-larissa`, integrado a este repo (push na `main` publica em produção).
Framework Preset **Other** · Root Directory na raiz · sem Build/Install Command, sem Output Directory.

## Histórico

- **v1 (nov/2026):** design verde-petróleo com a marca Integra, export do Claude Design (`integra-saude-lps.zip` e `integra-saude-lpsatt.zip`), depois otimização de performance em 07/11/2026.
- **v2 (19/11/2026):** novo design (`lp-larissa-v2.zip`), substituição completa dos arquivos da v1. Visual e copy como vieram do zip; `main.js` e `style.css` só com o ajuste do mascote abaixo.

## Edições sobre o exportado (v2)

- `<head>`: adicionados `canonical`, `og:url` e `og:image` absoluta com dimensões.
- `?v=2` nos arquivos que repetem o nome da v1 (`style.css`, os três JS, `dra-larissa-hero.webp`, `dra-larissa-cta.webp`, `og.jpg`): `/assets/` tem cache imutável de 1 ano, e sem isso quem já abriu a página continuaria com os arquivos antigos. **Trocar o valor de `?v=` a cada mudança em arquivo de mesmo nome.**
- **Mascote (19/11/2026):** o dentinho usa o mesmo voo da abelhinha da LP infantil da Humanos Care (`AK-Media-LPs/humanos-care-lp-infantil`): começa no lugar dele no topo e, ao rolar, fica ancorado na página com movimento próprio e contínuo (tempo deformado, deriva, inclinação). Quando sai da tela, espera 1,6s e volta voando devagar. No desktop passeia pelas margens laterais e troca de lado; no celular usa a largura toda. Ao virar, só o desenho espelha, e o balão de fala (ativo nas duas telas) abre para dentro da tela. Com `prefers-reduced-motion`, fica parado na borda direita. `main.js?v=5`, `style.css?v=4`.
- Mantidos da v1: `vercel.json`, `.gitignore` e este README.

## Pendências

- **Domínio próprio:** trocar `https://integra-saude-lp-larissa.vercel.app/` em `canonical`, `og:url` e `og:image` quando o domínio da Dra. Larissa for configurado.
- **GTM / Meta Pixel:** a v1 não tinha nenhum código. Colar entre `TRACKING HEAD` e `TRACKING BODY` no `index.html`. O clique em link `wa.me` já dispara `dataLayer.push({event:'clique_whatsapp'})`, `fbq('track','Lead')` e `gtag('event','generate_lead')`, se existirem.
- **WhatsApp:** testar o número em um aparelho real.

Última atualização: 19/11/2026
