"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Github, ExternalLink, Brain, Eye, Cpu, BarChart3, Heart,
    Home, ShoppingCart, Briefcase, FileText, Layers, Zap, LineChart, Grid3X3
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = [
    { id: "all", label: "All Projects", icon: Grid3X3 },
    { id: "ml", label: "Machine Learning", icon: BarChart3 },
    { id: "dl", label: "Deep Learning", icon: Brain },
    { id: "cv", label: "Computer Vision", icon: Eye },
    { id: "ip", label: "Image Processing", icon: Cpu },
];

const keyStats = [
    { value: "34", label: "Notebooks", icon: FileText },
    { value: "4", label: "Categories", icon: Layers },
    { value: "10+", label: "ML Algorithms", icon: BarChart3 },
    { value: "8+", label: "DL Architectures", icon: Brain },
];

const techStack = ["Python", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "PyTorch", "NumPy", "Pandas"];

const allProjects = [
    // Machine Learning
    {
        category: "ml",
        name: "Heart Disease Prediction",
        desc: "XGBoost, LightGBM, SHAP explainability, Optuna tuning, ADASYN",
        icon: Heart,
        featured: true,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/HEART_FINAL.ipynb",
        techniques: ["XGBoost", "LightGBM", "SHAP", "Optuna"]
    },
    {
        category: "ml",
        name: "House Price Prediction",
        desc: "Linear, Ridge, Lasso Regression with 3D visualization",
        icon: Home,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/houseproce.ipynb",
        techniques: ["Linear Regression", "Ridge", "Lasso", "3D Viz"]
    },
    {
        category: "ml",
        name: "Market Basket Analysis",
        desc: "Apriori Algorithm for association rules mining",
        icon: ShoppingCart,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/store_data.ipynb",
        techniques: ["Apriori", "Association Rules", "Support", "Lift"]
    },
    {
        category: "ml",
        name: "Naive Bayes Job Prediction",
        desc: "Gaussian Naive Bayes classification for job placement",
        icon: Briefcase,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/BAyes_theroem.ipynb",
        techniques: ["Naive Bayes", "Classification", "Label Encoding"]
    },
    {
        category: "ml",
        name: "PCA vs LDA Comparison",
        desc: "Dimensionality reduction comparison with Gaussian NB",
        icon: LineChart,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Machine%20Learning/pca_lda.ipynb",
        techniques: ["PCA", "LDA", "Feature Reduction"]
    },
    {
        category: "ml",
        name: "SVM Classifier",
        desc: "RBF kernel classification on Iris dataset",
        icon: BarChart3,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Machine%20Learning/svm.ipynb",
        techniques: ["SVM", "RBF Kernel", "Classification"]
    },
    {
        category: "ml",
        name: "Decision Tree Classifier",
        desc: "Job prediction using entropy criterion with tree visualization",
        icon: BarChart3,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Machine%20Learning/decision%20tree.ipynb",
        techniques: ["Decision Tree", "Entropy", "Visualization"]
    },
    {
        category: "ml",
        name: "KNN, SVM, Random Forest",
        desc: "Classifier comparison on Iris dataset",
        icon: BarChart3,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Machine%20Learning/knn_svm_decision_random.ipynb",
        techniques: ["KNN", "SVM", "Random Forest", "Comparison"]
    },
    {
        category: "ml",
        name: "Calorie Burn Prediction",
        desc: "Exercise data analysis with Plotly visualizations",
        icon: Zap,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Machine%20Learning/mini%20project.ipynb",
        techniques: ["Regression", "Plotly", "EDA"]
    },
    {
        category: "ml",
        name: "Logistic Regression CV",
        desc: "K-Fold, Stratified K-Fold, Leave-One-Out cross-validation",
        icon: BarChart3,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Machine%20Learning/reg_logestic.ipynb",
        techniques: ["Logistic Regression", "K-Fold", "LOOCV"]
    },
    // Deep Learning
    {
        category: "dl",
        name: "Transfer Learning Models",
        desc: "VGG16/19, ResNet50/101/152, InceptionV3, MobileNet, DenseNet",
        icon: Brain,
        featured: true,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Deep%20Learning/DL_Lab-7_Transfer_Learning.ipynb",
        techniques: ["VGG", "ResNet", "Inception", "MobileNet"]
    },
    {
        category: "dl",
        name: "Hyperparameter Tuning",
        desc: "MNIST with dropout, batch size, optimizers comparison",
        icon: Brain,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Deep%20Learning/DL_Hyper-parameter%20Tuning_Lab-4.ipynb",
        techniques: ["MNIST", "Dropout", "Adam", "SGD"]
    },
    {
        category: "dl",
        name: "Advanced Architectures",
        desc: "Bidirectional LSTM, Stacked LSTM, Conv2D, Depthwise Separable",
        icon: Brain,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Deep%20Learning/DL_T2_Review_Module-2.ipynb",
        techniques: ["LSTM", "Conv2D", "Depthwise Conv"]
    },
    {
        category: "dl",
        name: "Perceptron Learning",
        desc: "AND, OR, XOR gate implementation with weight evolution",
        icon: Brain,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Deep%20Learning/DL_Lab-1-and-Lab-2.ipynb",
        techniques: ["Perceptron", "Logic Gates", "Weight Viz"]
    },
    // Computer Vision
    {
        category: "cv",
        name: "Edge Detection Algorithms",
        desc: "Canny, Sobel, Prewitt, Roberts edge detectors",
        icon: Eye,
        featured: true,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/CV_Lab-7.ipynb",
        techniques: ["Canny", "Sobel", "Prewitt", "Roberts"]
    },
    {
        category: "cv",
        name: "Image Similarity Search",
        desc: "VGG16 feature extraction on Fashion MNIST",
        icon: Eye,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/Cv_T2-Review_Module2.ipynb",
        techniques: ["VGG16", "Feature Extraction", "Similarity"]
    },
    {
        category: "cv",
        name: "Local Binary Pattern (LBP)",
        desc: "Manual LBP + GLCM texture analysis",
        icon: Eye,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/cv3_LAB-LBP2.ipynb",
        techniques: ["LBP", "GLCM", "Texture Analysis"]
    },
    {
        category: "cv",
        name: "Image Smoothing & Filtering",
        desc: "Gaussian, Median, Bilateral filters comparison",
        icon: Eye,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/CV_Lab-5_Smoothing.ipynb",
        techniques: ["Gaussian Blur", "Median", "Bilateral"]
    },
    {
        category: "cv",
        name: "Noise Reduction",
        desc: "Salt & pepper noise, Gaussian noise, filtering",
        icon: Eye,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/CV_Lab-7_edge_dection.ipynb",
        techniques: ["Noise Simulation", "Denoising"]
    },
    {
        category: "cv",
        name: "Bit Plane Slicing",
        desc: "Decomposing images into 8 bit planes",
        icon: Eye,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/CV3_Bit_Plane_Sclicing_Lab-4.ipynb",
        techniques: ["Bit Plane", "Binary Analysis"]
    },
    {
        category: "cv",
        name: "Histogram Analysis",
        desc: "Histogram equalization and contrast enhancement",
        icon: Eye,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Computer%20Vision/CV3_Lab_Histogram_Lab-3.ipynb",
        techniques: ["Histogram", "Equalization"]
    },
    // Image Processing
    {
        category: "ip",
        name: "Morphological Operations",
        desc: "Opening, Closing, Skeletonization, Thickening",
        icon: Cpu,
        featured: true,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/Fip_T2_Review_Module-2.ipynb",
        techniques: ["Morphology", "Skeleton", "Binary Ops"]
    },
    {
        category: "ip",
        name: "Histogram Equalization",
        desc: "Contrast enhancement techniques",
        icon: Cpu,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/Fip_Lab-4-Histogram_Equalization.ipynb",
        techniques: ["Histogram", "Contrast", "Enhancement"]
    },
    {
        category: "ip",
        name: "LZW Compression",
        desc: "Lempel-Ziv-Welch encoding/decoding",
        icon: Cpu,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/FIP-Lab-LZW-Coding.ipynb",
        techniques: ["LZW", "Compression", "Encoding"]
    },
    {
        category: "ip",
        name: "Spatial Filtering",
        desc: "Averaging, Gaussian, Min/Max filters",
        icon: Cpu,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/Fip_Lab-5-Spatial_filtering.ipynb",
        techniques: ["Spatial Filter", "Averaging", "Min/Max"]
    },
    {
        category: "ip",
        name: "Basic Image Operations",
        desc: "Add, Subtract, Multiply, Bitwise ops (AND, OR, NOT)",
        icon: Cpu,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/FIP_Lab-1-Basic_Functions.ipynb",
        techniques: ["Arithmetic", "Bitwise", "OpenCV"]
    },
    {
        category: "ip",
        name: "Color Channel Separation",
        desc: "RGB channel visualization and manipulation",
        icon: Cpu,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/FIP-Lab-2-Split_Channels.ipynb",
        techniques: ["RGB", "Channels", "Color Space"]
    },
    {
        category: "ip",
        name: "Gray Level Slicing",
        desc: "Intensity-based segmentation with/without background",
        icon: Cpu,
        link: "https://colab.research.google.com/github/9046balaji/collage-projects/blob/main/Fundamentals%20of%20Image%20Processing/Fip_Lab-3-Gray_Scale.ipynb",
        techniques: ["Thresholding", "Segmentation"]
    },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
    ml: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
    dl: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
    cv: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400" },
    ip: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
};

const categoryLabels: Record<string, string> = {
    ml: "Machine Learning",
    dl: "Deep Learning",
    cv: "Computer Vision",
    ip: "Image Processing",
};

export default function MLShowcase() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredProjects = activeTab === "all"
        ? allProjects
        : allProjects.filter(p => p.category === activeTab);

    const featuredProjects = allProjects.filter(p => p.featured);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <article className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 text-center"
                    >
                        <Link href="/#projects" className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">ML & Deep Learning Showcase</h1>
                        <p className="text-xl text-gray-400 mb-6">
                            A comprehensive collection of Jupyter notebooks covering Machine Learning, Deep Learning,
                            Computer Vision & Image Processing fundamentals.
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                            {keyStats.map((stat, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4">
                            <a href="https://github.com/9046balaji/collage-projects" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium flex items-center gap-2 transition-colors">
                                <Github className="w-5 h-5" /> View Repository
                            </a>
                            <a href="https://colab.research.google.com/github/9046balaji/collage-projects" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
                                <ExternalLink className="w-5 h-5" /> Open in Colab
                            </a>
                        </div>
                    </motion.div>

                    {/* Featured Projects */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Zap className="text-yellow-400" /> Featured Projects
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {featuredProjects.map((project, idx) => {
                                const colors = categoryColors[project.category];
                                const Icon = project.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-5 rounded-xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-all group`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className={`w-5 h-5 ${colors.text}`} />
                                            <span className={`text-xs font-medium ${colors.text}`}>
                                                {categoryLabels[project.category]}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-3">{project.desc}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.techniques.slice(0, 3).map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Tab Navigation */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                            ? "bg-primary text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    {tab.id !== "all" && (
                                        <span className="ml-1 px-1.5 py-0.5 bg-white/10 rounded text-xs">
                                            {allProjects.filter(p => p.category === tab.id).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {filteredProjects.map((project, idx) => {
                                const colors = categoryColors[project.category];
                                const Icon = project.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 rounded-xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-all group`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className={`w-4 h-4 ${colors.text}`} />
                                            <span className={`text-xs font-medium ${colors.text}`}>
                                                {categoryLabels[project.category]}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-2">{project.desc}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.techniques.map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </a>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>

                    {/* Technology Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                { category: "Languages", items: ["Python 3.x"] },
                                { category: "ML Libraries", items: ["Scikit-learn", "XGBoost", "LightGBM"] },
                                { category: "Deep Learning", items: ["TensorFlow", "Keras"] },
                                { category: "Computer Vision", items: ["OpenCV", "Skimage"] },
                                { category: "Visualization", items: ["Matplotlib", "Seaborn", "Plotly"] },
                            ].map((stack) => (
                                <div key={stack.category} className="p-4 bg-white/5 rounded-lg">
                                    <h3 className="font-semibold text-primary mb-2 text-sm">{stack.category}</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {stack.items.map((item) => (
                                            <span key={item} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
