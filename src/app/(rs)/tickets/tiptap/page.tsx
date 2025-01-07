"use client";

// src/Tiptap.tsx
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as BuiltInImage } from "@tiptap/extension-image";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Paragraph from "@tiptap/extension-paragraph";
import { Button } from "@/components/ui/button";

// Extend the Image extension to add a class attribute
const Image = BuiltInImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null, // default is null, so it doesn't affect existing images
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          return {
            class: attributes.class,
          };
        },
      },
    };
  },
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Image, Document, Paragraph, Text, Dropcursor],
    content: `...`,
    onUpdate: ({ editor }) => {
      console.log("Editor Content:", editor.getHTML());
    },
  });

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result, class: "uploaded-image" }) // Add class here
            .run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        {/* Upload Button */}
        <Button
          variant="secondary"
          onClick={() => document.getElementById("fileInput")?.click()}
          style={{
            marginBottom: "10px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Upload Image
        </Button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </div>

      {/* Tiptap Editor */}
      <EditorContent editor={editor} />

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      )}
       <style jsx>{`
        .uploaded-image-wrapper {
          position: relative;
          display: inline-block;
        }

        .uploaded-image {
          position: relative;
          display: block;
          max-width: 100%;
        }

        /* Corner point styles */
        .uploaded-image-wrapper::before,
        .uploaded-image-wrapper::after,
        .uploaded-image-wrapper .corner-top-right,
        .uploaded-image-wrapper .corner-bottom-left,
        .uploaded-image-wrapper .corner-bottom-right {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: blue;
          border-radius: 50%;
        }

        /* Top-left corner */
        .uploaded-image-wrapper::before {
          top: -5px;
          left: -5px;
        }

        /* Top-right corner */
        .uploaded-image-wrapper::after {
          top: -5px;
          right: -5px;
        }

        /* Bottom-left corner */
        .corner-bottom-left {
          bottom: -5px;
          left: -5px;
        }

        /* Bottom-right corner */
        .corner-bottom-right {
          bottom: -5px;
          right: -5px;
        }
      `}</style>
    </>
  );
};

export default Tiptap;
