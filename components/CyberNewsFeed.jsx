// Migrated from src/HackerNewsClone.jsx
"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { ChevronUp, ChevronDown, MessageCircle, ExternalLink, Plus, Search, User, Clock } from "lucide-react";


function StoryDetail({ story, onBack }) {
	const getTimeAgo = (date) => {
		const now = new Date();
		const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
		if (diffInHours < 1) return 'just now';
		if (diffInHours === 1) return '1 hour ago';
		if (diffInHours < 24) return `${diffInHours} hours ago`;
		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays === 1) return '1 day ago';
		return `${diffInDays} days ago`;
	};
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-orange-500 text-white p-3">
				<div className="max-w-4xl mx-auto flex items-center">
					<button onClick={onBack} className="mr-4 hover:underline">← Back</button>
					<span className="font-bold text-lg">Story Detail</span>
				</div>
			</header>
			<div className="max-w-4xl mx-auto p-4">
				<div className="bg-white rounded-lg shadow p-6">
					<h1 className="text-2xl font-bold mb-4">{story.title}</h1>
					<div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
						<span>{story.score} points</span>
						<span>by {story.author}</span>
						<span>{getTimeAgo(story.createdAt)}</span>
						<span>{story.commentCount} comments</span>
					</div>
					{story.text && (
						<div className="prose prose-sm max-w-none mb-6">
							<p className="text-gray-700">{story.text}</p>
						</div>
					)}
					{story.url && (
						<div className="mb-6">
							<a href={story.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-orange-600 hover:underline">
								View Link <ExternalLink className="ml-1 h-4 w-4" />
							</a>
						</div>
					)}
					<div className="border-t pt-6">
						<h3 className="text-lg font-medium mb-4">Comments</h3>
						<div className="text-gray-500 text-sm italic">
							Comments functionality would be implemented here with nested threads.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function SubmitModal({ onClose, onSubmit, currentUser }) {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [text, setText] = useState('');
	const handleSubmit = () => {
		if (!title.trim()) return;
		onSubmit({ title: title.trim(), url: url.trim(), text: text.trim() });
		setTitle('');
		setUrl('');
		setText('');
	};
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-lg font-bold mb-4">Submit a Story</h2>
				<div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Story title..." />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">URL (optional)</label>
						<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="https://..." />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">Text (optional)</label>
						<textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-24 resize-none" placeholder="Additional text or description..." />
					</div>
					<div className="flex space-x-3">
						<button onClick={handleSubmit} className="flex-1 bg-orange-500 text-white py-2 px-4 rounded text-sm hover:bg-orange-600" disabled={!title.trim()}>Submit</button>
						<button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-400">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function LoginModal({ onClose, onLogin }) {
	const [username, setUsername] = useState('');
	const handleSubmit = () => {
		if (!username.trim()) return;
		onLogin(username.trim());
	};
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-sm">
				<h2 className="text-lg font-bold mb-4">Login</h2>
				<div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Enter username..." />
					</div>
					<div className="flex space-x-3">
						<button onClick={handleSubmit} className="flex-1 bg-orange-500 text-white py-2 px-4 rounded text-sm hover:bg-orange-600" disabled={!username.trim()}>Login</button>
						<button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-400">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function CyberNewsFeed() {
	const [stories, setStories] = useState([]);
	const [users, setUsers] = useState(new Map());
	const [currentUser, setCurrentUser] = useState(null);
	const [view, setView] = useState('top');
	const [showSubmit, setShowSubmit] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedStory, setSelectedStory] = useState(null);
	const [sortBy, setSortBy] = useState('score');

		useEffect(() => {
			setStories([]);
			setUsers(new Map());
		}, []);

	const getTimeAgo = (date) => {
		const now = new Date();
		const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
		if (diffInHours < 1) return 'just now';
		if (diffInHours === 1) return '1 hour ago';
		if (diffInHours < 24) return `${diffInHours} hours ago`;
		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays === 1) return '1 day ago';
		return `${diffInDays} days ago`;
	};

	const handleVote = (storyId, direction) => {
		if (!currentUser) {
			setShowLogin(true);
			return;
		}
		setStories(prev => prev.map(story => {
			if (story.id === storyId) {
				return {
					...story,
					score: story.score + (direction === 'up' ? 1 : -1)
				};
			}
			return story;
		}));
	};

	const handleSubmit = (formData) => {
		if (!currentUser) {
			setShowLogin(true);
			return;
		}
		const newStory = {
			id: Date.now(),
			title: formData.title,
			url: formData.url,
			text: formData.text,
			author: currentUser,
			score: 1,
			comments: [],
			commentCount: 0,
			createdAt: new Date(),
			type: formData.url ? 'story' : 'ask'
		};
		setStories(prev => [newStory, ...prev]);
		setShowSubmit(false);
	};

	const handleLogin = (username) => {
		if (!users.has(username)) {
			const newUser = {
				username,
				karma: 1,
				created: new Date()
			};
			setUsers(prev => new Map(prev).set(username, newUser));
		}
		setCurrentUser(username);
		setShowLogin(false);
	};

	const getSortedStories = () => {
		let filtered = stories;
		if (searchQuery) {
			filtered = stories.filter(story =>
				story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				story.author.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		return filtered.sort((a, b) => {
			switch (sortBy) {
				case 'score':
					return b.score - a.score;
				case 'time':
					return b.createdAt - a.createdAt;
				case 'comments':
					return b.commentCount - a.commentCount;
				default:
					return b.score - a.score;
			}
		});
	};

	const getStoryTypePrefix = (story) => {
		switch (story.type) {
			case 'ask': return 'Ask HN: ';
			case 'show': return 'Show HN: ';
			case 'tell': return 'Tell HN: ';
			default: return '';
		}
	};

	const getDomainFromUrl = (url) => {
		if (!url) return '';
		try {
			return new URL(url).hostname.replace('www.', '');
		} catch {
			return '';
		}
	};

	if (selectedStory) {
		return <StoryDetail story={selectedStory} onBack={() => setSelectedStory(null)} />;
	}

		return (
			<div className="min-h-screen bg-gray-50">
				<Header />
				<div className="max-w-6xl mx-auto p-4">
					<div className="bg-white rounded-lg shadow">
						{getSortedStories().map((story, index) => (
						<div key={story.id} className="p-4 border-b border-gray-200 last:border-b-0">
							<div className="flex items-start space-x-3">
								<div className="flex flex-col items-center space-y-1">
									<button onClick={() => handleVote(story.id, 'up')} className="p-1 hover:bg-gray-100 rounded">
										<ChevronUp className="h-4 w-4 text-gray-600" />
									</button>
									<span className="text-sm font-medium text-gray-700">{story.score}</span>
									<button onClick={() => handleVote(story.id, 'down')} className="p-1 hover:bg-gray-100 rounded">
										<ChevronDown className="h-4 w-4 text-gray-600" />
									</button>
								</div>
								<div className="flex-1">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="text-lg font-medium text-gray-900 mb-1">
												<span className="text-orange-600 font-normal text-sm mr-1">{index + 1}.</span>
												{getStoryTypePrefix(story)}
												{story.url ? (
													<a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{story.title}</a>
												) : (
													<button onClick={() => setSelectedStory(story)} className="hover:underline text-left">{story.title}</button>
												)}
												{story.url && (
													<span className="ml-1 text-sm text-gray-500">({getDomainFromUrl(story.url)})<ExternalLink className="inline h-3 w-3 ml-1" /></span>
												)}
											</h3>
											{story.text && (
												<p className="text-gray-600 text-sm mt-2 line-clamp-2">{story.text}</p>
											)}
										</div>
									</div>
									<div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
										<span className="flex items-center"><User className="h-3 w-3 mr-1" />{story.author}</span>
										<span className="flex items-center"><Clock className="h-3 w-3 mr-1" />{getTimeAgo(story.createdAt)}</span>
										<button onClick={() => setSelectedStory(story)} className="flex items-center hover:underline"><MessageCircle className="h-3 w-3 mr-1" />{story.commentCount} comments</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{showSubmit && (
				<SubmitModal onClose={() => setShowSubmit(false)} onSubmit={handleSubmit} currentUser={currentUser} />
			)}
			{showLogin && (
				<LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
			)}
		</div>
	);
}
import CyberNewsFeed from "../components/CyberNewsFeed";
