import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ML & Deep Learning Showcase — 34 Jupyter Notebooks",
    description:
        "A comprehensive collection of 34 Jupyter notebooks covering Machine Learning, Deep Learning, Computer Vision, and Image Processing with TensorFlow, scikit-learn, and OpenCV.",
    alternates: {
        canonical: "https://portfolio-sable-tau-b7ysjwnjns.vercel.app/projects/ml-showcase",
    },
    openGraph: {
        title: "ML & Deep Learning Showcase — 34 Jupyter Notebooks",
        description:
            "34 Jupyter notebooks covering ML, Deep Learning, Computer Vision, and Image Processing.",
        url: "https://kbalajirao.dev/projects/ml-showcase",
        type: "article",
    },
};

export default function MLShowcaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
