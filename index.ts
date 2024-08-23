type TagAttributes = Record<string, string | number | boolean>;
type TagContent = string | null;

class Tag {
   tagName: string;
   attributes: TagAttributes;
   content: TagContent;
   selfClosingTags: Set<string> = new Set(["br", "img", "input", "hr", "meta", "link"]);

   constructor(tagName: string, attributes: TagAttributes = {}, content: TagContent = null) {
      this.tagName = tagName;
      this.attributes = attributes;
      this.content = content;
   }

   renderAttributes(): string {
      return Object.entries(this.attributes)
         .map(([key, value]) => `${key}="${value}"`)
         .join(' ');
   }

   toString(): string {
      const attributesString = this.renderAttributes();
      const openingTag = `<${this.tagName}${attributesString ? ' ' + attributesString : ''}>`;

      if (this.selfClosingTags.has(this.tagName)) {
         return openingTag;
      }

      const closingTag = `</${this.tagName}>`;
      return `${openingTag}${this.content || ''}${closingTag}`;
   }
}