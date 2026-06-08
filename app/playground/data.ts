export const playgroundData = {
    css: {
        title: "CSS Properties Playground | Codophile",
        description: "Explore CSS by topic. Every control maps to a real property from the spec—border-collapse, table-layout, transform, flexbox, and more with live preview.",
        keywords: ["css playground", "css properties", "css visual editor", "css learning tool", "interactive css"],
        properties: {
            border: {
                title: "CSS Border Properties Playground - border, border-radius",
                description: "Experiment with border-width, border-style, border-color, and border-radius. Every control maps to a real CSS property with live preview and copy-paste code.",
                keywords: ["css border", "border property", "border-width", "border-style", "border-radius", "css visual editor"]
            },
            table: {
                title: "CSS Table Properties Playground - border-collapse, table-layout",
                description: "Master table-specific CSS: border-collapse, border-spacing, table-layout, caption-side, and empty-cells. See each property's effect on a real HTML table.",
                keywords: ["css table", "border-collapse", "table-layout", "caption-side", "empty-cells", "border-spacing"]
            },
            "2d-transforms": {
                title: "CSS 2D Transforms Playground - Rotate, Scale, Translate, Skew",
                description: "Experiment with CSS 2D transforms including rotate(), scale(), translate(), and skew(). Interactive visual controls for mastering CSS transform property on a 2D plane.",
                keywords: ["css 2d transforms", "css rotate", "css scale", "css translate", "css skew", "transform property"]
            },
            "3d-transforms": {
                title: "CSS 3D Transforms Playground - Perspective & 3D Rotation",
                description: "Master CSS 3D transformations with perspective, rotateX, rotateY, rotateZ, and translate3d. Visual playground for learning advanced 3D CSS effects.",
                keywords: ["css 3d transforms", "css perspective", "rotateX", "rotateY", "rotateZ", "translate3d", "3d css"]
            },
            "backdrop-filter": {
                title: "CSS Backdrop Filter Playground - Glassmorphism Effects",
                description: "Create stunning glassmorphism effects with CSS backdrop-filter. Experiment with blur, brightness, contrast, and saturation for frosted glass UI designs.",
                keywords: ["css backdrop-filter", "glassmorphism", "frosted glass css", "backdrop blur", "glass ui"]
            },
            backgrounds: {
                title: "CSS Background Properties Playground - Gradients & Images",
                description: "Master CSS background properties including background-image, background-size, background-position, and linear/radial gradients with visual controls.",
                keywords: ["css background", "background-image", "css gradients", "linear-gradient", "radial-gradient", "background-size"]
            },
            "box-shadow": {
                title: "CSS Box Shadow Generator - Create Depth & Glow Effects",
                description: "Generate CSS box-shadow effects visually. Create depth, glow, and layered shadows with interactive controls for offset, blur, spread, and color.",
                keywords: ["css box-shadow", "box shadow generator", "css shadows", "glow effects", "shadow layers"]
            },
            filters: {
                title: "CSS Filter Effects Playground - Blur, Brightness, Contrast",
                description: "Experiment with CSS filter property including blur, brightness, contrast, grayscale, hue-rotate, and more. Visual playground for image and element filters.",
                keywords: ["css filters", "css filter property", "blur filter", "brightness css", "contrast css", "hue-rotate"]
            },
            flexbox: {
                title: "CSS Flexbox Layout Playground - Visual Flex Container Editor",
                description: "Master CSS Flexbox layout with interactive controls for flex-direction, justify-content, align-items, flex-wrap, and gap. Learn flexbox visually.",
                keywords: ["css flexbox", "flexbox layout", "flex-direction", "justify-content", "align-items", "flex playground"]
            },
            "text-shadow": {
                title: "CSS Text Shadow Generator - Typography Effects",
                description: "Create beautiful CSS text-shadow effects with visual controls. Experiment with multiple shadow layers, blur, and color for stunning typography.",
                keywords: ["css text-shadow", "text shadow generator", "typography css", "text effects", "shadow text"]
            },
            transitions: {
                title: "CSS Transitions Playground - Animation Timing & Duration",
                description: "Master CSS transitions with interactive controls for transition-property, duration, timing-function (ease, linear, cubic-bezier), and delay.",
                keywords: ["css transitions", "transition property", "easing functions", "cubic-bezier", "transition duration"]
            },
            typography: {
                title: "CSS Typography Playground - Font Properties Editor",
                description: "Experiment with CSS typography properties including font-family, font-size, font-weight, line-height, letter-spacing, and text-transform.",
                keywords: ["css typography", "font properties", "font-family", "font-size", "letter-spacing", "line-height"]
            },
            grid: {
                title: "CSS Grid Layout Playground - Visual Grid Container Editor",
                description: "Master CSS Grid layout with interactive controls for grid-template-columns, grid-template-rows, gap, and grid-item placement.",
                keywords: ["css grid", "grid layout", "grid-template-columns", "grid-gap", "grid-area"]
            },
            "box-model": {
                title: "CSS Box Model Playground - width, margin, padding, box-sizing",
                description: "Experiment with width, height, margin, padding, and box-sizing. See how the CSS box model affects element size.",
                keywords: ["css box model", "box-sizing", "margin", "padding", "width", "height"]
            },
            positioning: {
                title: "CSS Position Playground - relative parent, absolute child, containing block",
                description: "Master position, containing blocks, top/right/bottom/left, and z-index. Scenarios: relative+absolute, static parent escape, fixed viewport, centering.",
                keywords: ["css position", "relative", "absolute", "containing block", "z-index", "fixed", "top", "left"]
            },
            overflow: {
                title: "CSS Overflow Playground - overflow, text-overflow, white-space",
                description: "Control overflow, text-overflow ellipsis, and white-space on constrained text.",
                keywords: ["css overflow", "text-overflow", "ellipsis", "white-space"]
            },
            outline: {
                title: "CSS Outline Playground - outline, outline-offset",
                description: "outline, outline-style, and outline-offset — lines drawn outside the border without affecting layout.",
                keywords: ["css outline", "outline-offset", "focus ring"]
            },
            animations: {
                title: "CSS Animations Playground - @keyframes, easing, fill-mode",
                description: "Master @keyframes and every animation-* property. Presets: spinners, bounce, slide entrances, pulse badges. Scenarios with delay, direction, and fill-mode.",
                keywords: ["css animation", "keyframes", "animation-duration", "animation-timing-function", "animation-fill-mode", "animation-iteration-count"]
            },
            lists: {
                title: "CSS List Properties Playground - list-style-type, position",
                description: "list-style-type and list-style-position on ordered and unordered lists.",
                keywords: ["list-style-type", "list-style-position", "css lists"]
            },
            columns: {
                title: "CSS Multi-column Playground - column-count, gap, rule",
                description: "column-count, column-gap, and column-rule for newspaper-style text layout.",
                keywords: ["css columns", "column-count", "column-gap", "column-rule"]
            },
            "object-fit": {
                title: "CSS Object Fit Playground - object-fit, object-position",
                description: "object-fit and object-position for images and replaced elements.",
                keywords: ["object-fit", "object-position", "css image fit"]
            },
            "opacity-blend": {
                title: "CSS Opacity & Blend Playground - opacity, all mix-blend-mode values",
                description: "opacity and all 16 mix-blend-mode values. Compare solid layer vs image layer over a colorful backdrop.",
                keywords: ["css opacity", "mix-blend-mode", "blend modes", "multiply", "screen", "difference"]
            },
            "text-layout": {
                title: "CSS Text Layout Playground - decoration, word-break, overflow-wrap",
                description: "text-decoration, word-break, and overflow-wrap for long text in narrow boxes.",
                keywords: ["text-decoration", "word-break", "overflow-wrap"]
            },
            scroll: {
                title: "CSS Scroll Playground - scroll-behavior, scroll-snap",
                description: "scroll-behavior and scroll-snap-type for smooth and snapped scrolling.",
                keywords: ["scroll-behavior", "scroll-snap-type", "css scroll"]
            },
            interaction: {
                title: "CSS Interaction Playground - all 36 cursor values",
                description: "Every CSS cursor keyword — general, selection, drag, resize, zoom — plus pointer-events and user-select.",
                keywords: ["css cursor", "grab", "resize cursor", "pointer-events", "user-select"]
            },
            "clip-path": {
                title: "CSS Clip Path Playground - all shapes, custom polygon editor",
                description: "clip-path: circle, ellipse, inset, polygon. Build custom polygons — add/remove points, presets, evenodd fill rule.",
                keywords: ["clip-path", "polygon clip-path", "circle clip", "inset clip-path"]
            },
            visibility: {
                title: "CSS Visibility Playground - visibility, content-visibility",
                description: "visibility and content-visibility — hide elements while preserving or skipping layout.",
                keywords: ["visibility", "content-visibility", "css hidden"]
            },
            tooltip: {
                title: "CSS Tooltip Playground - Positioning & Effects",
                description: "Design and customize CSS tooltips. Experiment with positioning, arrows, colors, and animations for engaging user interfaces.",
                keywords: ["css tooltip", "tooltip positioning", "css arrow", "tooltip animation", "hover effects"]
            },
            pagination: {
                title: "CSS Pagination Playground - Navigation Styles",
                description: "Design and customize CSS pagination links. Experiment with various styles like bordered, rounded, active states, and hover effects.",
                keywords: ["css pagination", "pagination styles", "active state", "hover effects", "breadcrumb"]
            },
            buttons: {
                title: "CSS Buttons Playground - Styling & Hover Effects",
                description: "Design, style, and animate CSS buttons. Experiment with colors, borders, shadows, hover effects, and button groups.",
                keywords: ["css buttons", "button styling", "button hover", "css button groups", "button animations"]
            }
        }
    },
    tailwind: {
        title: "Tailwind CSS Playground | Codophile",
        description: "Rapidly prototype with Tailwind CSS utility classes. Experiment with layouts, typography, transforms, and more with real-time visual feedback.",
        keywords: ["tailwind playground", "tailwind css editor", "utility classes", "tailwind visual editor", "tailwind learning"],
        properties: {
            layout: {
                title: "Tailwind Layout Utilities Playground - Flex, Grid, Spacing",
                description: "Master Tailwind layout utilities including flexbox, grid, spacing, sizing, and positioning classes. Visual playground for rapid prototyping.",
                keywords: ["tailwind layout", "tailwind flexbox", "tailwind grid", "spacing utilities", "tailwind sizing"]
            },
            grid: {
                title: "Tailwind Grid Layout Playground - Grid Template & Spacing",
                description: "Master Tailwind Grid layout utilities including grid-cols, grid-rows, gap, and col/row spanning classes. Visual playground for rapid prototyping.",
                keywords: ["tailwind grid", "grid-cols", "grid-rows", "gap", "col-span", "row-span"]
            },
            typography: {
                title: "Tailwind Typography Playground - Font & Text Utilities",
                description: "Experiment with Tailwind typography utilities for font-size, font-weight, line-height, letter-spacing, and text colors.",
                keywords: ["tailwind typography", "font utilities", "text classes", "tailwind fonts", "typography tailwind"]
            },
            borders: {
                title: "Tailwind Borders & Rings - Border Utilities Playground",
                description: "Master Tailwind border utilities including border-width, rounded corners, border-color, and focus ring effects.",
                keywords: ["tailwind borders", "rounded corners", "border utilities", "focus ring", "tailwind rounded"]
            },
            effects: {
                title: "Tailwind Effects & Filters - Shadow, Opacity, Blend Modes",
                description: "Experiment with Tailwind effect utilities including box-shadow, opacity, mix-blend-mode, and backdrop-filter for stunning UI effects.",
                keywords: ["tailwind effects", "tailwind shadow", "mix-blend-mode", "backdrop-blur tailwind", "opacity utilities"]
            },
            transforms: {
                title: "Tailwind Transform Utilities - Scale, Rotate, Translate, Skew",
                description: "Master Tailwind transform utilities for scaling, rotating, translating, and skewing elements with utility classes.",
                keywords: ["tailwind transforms", "scale utilities", "rotate tailwind", "translate classes", "skew utilities"]
            },
            backgrounds: {
                title: "Tailwind Background Utilities - Colors, Gradients, Images",
                description: "Experiment with Tailwind background utilities including background-color, gradients, background-image, and background-size.",
                keywords: ["tailwind backgrounds", "background utilities", "tailwind gradients", "bg classes", "background-image tailwind"]
            },
            interactivity: {
                title: "Tailwind Interactivity Utilities - Cursor, Select, Pointer Events",
                description: "Master Tailwind interactivity utilities for customizing cursor styles, pointer events, and user selection behavior.",
                keywords: ["tailwind interactivity", "cursor utilities", "pointer-events", "user-select tailwind"]
            },
            animations: {
                title: "Tailwind Animations Playground - Animate Utilities & Transitions",
                description: "Experiment with Tailwind animation and transition utilities for creating smooth, engaging UI animations.",
                keywords: ["tailwind animations", "animate utilities", "transition tailwind", "animation classes"]
            },
            tooltips: {
                title: "Tailwind Tooltips - Position & Arrow Utilities",
                description: "Create custom tooltips using Tailwind CSS positioning, visibility, and border utilities. Master the art of tooltip creation.",
                keywords: ["tailwind tooltip", "tooltip positioning", "tailwind arrow", "hover effects", "group-hover"]
            },
            pagination: {
                title: "Tailwind Pagination Playground - Navigation Components",
                description: "Design and customize Tailwind CSS pagination links. Experiment with various styles like bordered, rounded, active states, and hover effects using utility classes.",
                keywords: ["tailwind pagination", "pagination components", "active state tailwind", "hover effects tailwind", "breadcrumb tailwind"]
            },
            buttons: {
                title: "Tailwind Buttons Playground - Button Components & Variants",
                description: "Design and customize Tailwind CSS buttons. Experiment with sizes, rounded corners, colors, hover states, and button groups using utility classes.",
                keywords: ["tailwind buttons", "button components", "tailwind button variants", "button hover tailwind", "button group tailwind"]
            },
            masks: {
                title: "Tailwind Mask Utilities Playground - Image & Gradient Masking",
                description: "Master Tailwind mask utilities including mask-image, mask-clip, mask-size, and gradient masks with interactive controls.",
                keywords: ["tailwind mask", "mask-image", "mask-clip", "gradient mask", "tailwind masking"]
            },
            scroll: {
                title: "Tailwind Scroll Utilities Playground - Behavior & Snap Alignment",
                description: "Master Tailwind scroll utilities including scroll-behavior, scroll-snap-type, scroll-snap-align, and scroll-padding with interactive controls.",
                keywords: ["tailwind scroll", "scroll-behavior", "scroll-snap", "scroll-padding", "scroll-margin"]
            },
            transitions: {
                title: "Tailwind Transition Utilities Playground - Duration, Easing & Delay",
                description: "Master Tailwind transition utilities including transition-property, duration, timing-function, delay, and transition-behavior with interactive controls.",
                keywords: ["tailwind transition", "transition-property", "transition-duration", "transition-timing-function", "transition-delay"]
            }
        }
    }
};
