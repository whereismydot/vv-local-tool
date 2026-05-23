import { describe, expect, it } from 'vitest';
import { removePunctuationAfterLinks } from './remove-punctuation-after-links';

describe('removePunctuationAfterLinks', () => {
  it('removes dot after https link', () => {
    expect(removePunctuationAfterLinks('Ссылка: https://example.com. Дальше')).toBe('Ссылка: https://example.com Дальше');
  });

  it('removes punctuation chain after link', () => {
    expect(removePunctuationAfterLinks('Откройте https://example.com/path?!:; и проверьте')).toBe(
      'Откройте https://example.com/path и проверьте'
    );
  });

  it('works for www and bare domains', () => {
    expect(removePunctuationAfterLinks('www.example.com, site.ru/path?')).toBe('www.example.com site.ru/path');
  });

  it('keeps punctuation inside url unchanged', () => {
    expect(removePunctuationAfterLinks('https://example.com/path?x=1&y=2#top')).toBe(
      'https://example.com/path?x=1&y=2#top'
    );
  });

  it('keeps closing brackets and quotes after url', () => {
    expect(removePunctuationAfterLinks('(https://example.com.) и "https://example.com/path?"')).toBe(
      '(https://example.com) и "https://example.com/path"'
    );
  });

  it('does not modify text without links', () => {
    const input = 'Это просто текст. Без ссылок.';
    expect(removePunctuationAfterLinks(input)).toBe(input);
  });
});
