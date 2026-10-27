import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, UserSkill } from '../../types';
import {
  X, GraduationCap, MapPin, Github, Linkedin, Globe, FileText,
  ShieldCheck, Award, Star, Sparkles, Send, ArrowLeftRight, Check, Plus, Trash2
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    selectedUserProfile, setSelectedUserProfile, currentUser, setCurrentUser,
    activeRole, sendSwapRequest, setActiveTab, setUsers
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState('');
  const [editedAvailability, setEditedAvailability] = useState(currentUser.availabilityStatus);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Web Dev');
  const [newSkillType, setNewSkillType] = useState<'teach' | 'learn'>('teach');
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapTeachSkill, setSwapTeachSkill] = useState('');
  const [swapLearnSkill, setSwapLearnSkill] = useState('');
  const [swapMessage, setSwapMessage] = useState('');
  const [swapSuccess, setSwapSuccess] = useState(false);

  if (!selectedUserProfile) return null;

  const isSelf = selectedUserProfile.id === currentUser.id;

  const handleSaveProfile = () => {
    setCurrentUser(prev => ({
      ...prev,
      bio: editedBio || prev.bio,
      availabilityStatus: editedAvailability as any
    }));
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: UserSkill = {
      id: `s_${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: 'Intermediate',
      type: newSkillType,
      endorsements: 1
    };
    setCurrentUser(prev => ({
      ...prev,
      skillsToTeach: newSkillType === 'teach' ? [...prev.skillsToTeach, newSkill] : prev.skillsToTeach,
      skillsToLearn: newSkillType === 'learn' ? [...prev.skillsToLearn, newSkill] : prev.skillsToLearn,
    }));
    setNewSkillName('');
  };

  const handleSendSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendSwapRequest(selectedUserProfile.id, swapTeachSkill, swapLearnSkill, swapMessage);
    setSwapSuccess(true);
    setTimeout(() => {
      setSwapSuccess(false);
      setSwapModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedUserProfile(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover / Profile Banner Header */}
        <div className="relative mb-16">
          <div className="h-32 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
          <div className="absolute -bottom-12 left-6 flex items-end gap-4">
            <img
              src={selectedUserProfile.avatar}
              alt={selectedUserProfile.name}
              className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 object-cover shadow-xl"
            />
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedUserProfile.name}</h2>
                {selectedUserProfile.verificationStatus === 'verified' && (
                  <span className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400" title="Verified Student">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span>{selectedUserProfile.college} • {selectedUserProfile.department}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 mb-6 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          {isSelf ? (
            <button
              onClick={() => {
                setEditedBio(selectedUserProfile.bio);
                setIsEditing(!isEditing);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setSwapTeachSkill(currentUser.skillsToTeach[0]?.name || 'React');
                  setSwapLearnSkill(selectedUserProfile.skillsToTeach[0]?.name || 'UI Design');
                  setSwapModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 hover:opacity-95 transition-all"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Request Skill Swap</span>
              </button>
              <button
                onClick={() => {
                  setSelectedUserProfile(null);
                  setActiveTab('chat');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Message</span>
              </button>
            </>
          )}
        </div>

        {/* Edit Bio Form if self editing */}
        {isEditing && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">Update Profile Details</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bio</label>
              <textarea
                rows={3}
                value={editedBio}
                onChange={e => setEditedBio(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Availability Status</label>
              <select
                value={editedAvailability}
                onChange={e => setEditedAvailability(e.target.value as any)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
              >
                <option value="Available for Projects">Available for Projects</option>
                <option value="Looking for Hackathon Team">Looking for Hackathon Team</option>
                <option value="Seeking Co-founder">Seeking Co-founder</option>
                <option value="Open for Mentorship">Open for Mentorship</option>
              </select>
            </div>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Main Info */}
        <div className="space-y-6">
          
          {/* Bio & Status */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">About</span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                ● {selectedUserProfile.availabilityStatus}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedUserProfile.bio}
            </p>
          </div>

          {/* Skills to Teach & Learn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center justify-between">
                <span>Can Teach / Mentor</span>
                <span className="text-[10px] text-indigo-600 font-semibold">{selectedUserProfile.skillsToTeach.length} skills</span>
              </h4>
              <div className="space-y-1.5">
                {selectedUserProfile.skillsToTeach.map(s => (
                  <div key={s.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center justify-between">
                <span>Wants to Learn</span>
                <span className="text-[10px] text-purple-600 font-semibold">{selectedUserProfile.skillsToLearn.length} skills</span>
              </h4>
              <div className="space-y-1.5">
                {selectedUserProfile.skillsToLearn.map(s => (
                  <div key={s.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Add Skill controls if editing self */}
          {isSelf && (
            <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">Add New Skill</h5>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. PyTorch, Figma, Next.js"
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="flex-1 min-w-[140px] px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                />
                <select
                  value={newSkillType}
                  onChange={e => setNewSkillType(e.target.value as any)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                >
                  <option value="teach">Can Teach</option>
                  <option value="learn">Wants to Learn</option>
                </select>
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          )}

          {/* Badges & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Peer Rating</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{selectedUserProfile.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({selectedUserProfile.reviewCount} swap reviews)</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Badges</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedUserProfile.badges.map((badge, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="flex items-center gap-3 pt-2">
            {selectedUserProfile.githubUrl && (
              <a href={selectedUserProfile.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
            {selectedUserProfile.linkedinUrl && (
              <a href={selectedUserProfile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {selectedUserProfile.portfolioUrl && (
              <a href={selectedUserProfile.portfolioUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

        {/* Swap Modal Popup */}
        {swapModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button onClick={() => setSwapModalOpen(false)} className="absolute top-4 right-4 text-slate-400">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
                Skill Swap with {selectedUserProfile.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4">Propose a skill exchange session!</p>

              {swapSuccess ? (
                <div className="py-6 text-center text-emerald-600 font-semibold space-y-2">
                  <Check className="w-8 h-8 mx-auto text-emerald-500 animate-bounce" />
                  <p>Swap Request Sent!</p>
                </div>
              ) : (
                <form onSubmit={handleSendSwapSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">I will teach:</label>
                    <input
                      type="text"
                      required
                      value={swapTeachSkill}
                      onChange={e => setSwapTeachSkill(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">In exchange for learning:</label>
                    <input
                      type="text"
                      required
                      value={swapLearnSkill}
                      onChange={e => setSwapLearnSkill(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Note / Availability Message:</label>
                    <textarea
                      rows={2}
                      placeholder="Hi! Free this weekend for a 1-hour session on Google Meet?"
                      value={swapMessage}
                      onChange={e => setSwapMessage(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md mt-2"
                  >
                    Send Swap Invitation
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
