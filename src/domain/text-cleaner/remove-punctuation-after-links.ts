const DOMAIN_LABEL = String.raw`[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?`;
const DOMAIN_TLD = String.raw`[a-z\u0430-\u044f]{2,63}`;
const DOMAIN_CORE = String.raw`(?:${DOMAIN_LABEL}\.)+${DOMAIN_TLD}`;
const URL_BODY = String.raw`[^\s<>"\u00AB\u00BB]+`;
const BARE_DOMAIN_TAIL = String.raw`(?:[/?#][^\s<>"\u00AB\u00BB]*)?`;
const LINK_SOURCE = String.raw`(?:https?:\/\/${URL_BODY}|www\.${URL_BODY}|${DOMAIN_CORE}${BARE_DOMAIN_TAIL})`;
const LINK_PATTERN = new RegExp(String.raw`(?<![@A-Za-z0-9_\-\u0400-\u04FF])(${LINK_SOURCE})`, 'giu');
const TRAILING_PUNCTUATION_PATTERN = /([.,!?;:]+)([)\]\}"'\u00BB\u201D\u2019]*)$/u;
const TRAILING_PUNCTUATION_AFTER_CLOSERS_PATTERN = /([)\]\}"'\u00BB\u201D\u2019]+)([.,!?;:]+)$/u;

function stripTrailingPunctuationPreservingClosers(value: string): string {
  let next = value;

  while (true) {
    const updated = next
      .replace(TRAILING_PUNCTUATION_PATTERN, '$2')
      .replace(TRAILING_PUNCTUATION_AFTER_CLOSERS_PATTERN, '$1');

    if (updated === next) {
      return updated;
    }

    next = updated;
  }
}

/**
 * Removes trailing punctuation after links while preserving closing brackets and quotes.
 */
export function removePunctuationAfterLinks(input: string): string {
  return input.replace(LINK_PATTERN, (_match: string, link: string) => {
    const normalizedLink = stripTrailingPunctuationPreservingClosers(link);
    return normalizedLink;
  });
}
