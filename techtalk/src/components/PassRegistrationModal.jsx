import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, CheckCircle2, Ticket, ShieldCheck, CreditCard, GraduationCap, Briefcase, Building, UserCheck, Landmark, QrCode 
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { PASSES } from "../data/mockData.js";
import RealTimePaymentScanner from "./RealTimePaymentScanner.jsx";

export default function PassRegistrationModal() {
  const { 
    user,
    passModalOpen, 
    setPassModalOpen, 
    selectedPassType, 
    setSelectedPassType, 
    registerPass,
    showToast
  } = useApp();
  const navigate = useNavigate();

  const [modalView, setModalView] = useState("form"); // "form" or "scanner"
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [organization, setOrganization] = useState(user?.company || "");
  const [role, setRole] = useState(user?.title || "");
  const [additionalField, setAdditionalField] = useState("");
  const [notes, setNotes] = useState("");
  const [delegationMembers, setDelegationMembers] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset to form view whenever modal opens or pass type changes
  useEffect(() => {
    if (passModalOpen) {
      setModalView("form");
    }
  }, [passModalOpen, selectedPassType]);

  // Normalize active pass type
  const activeType = selectedPassType === "delegate-pass" ? "delegation-pass" : selectedPassType || "visitor-pass";

  const isVisitor = activeType === "visitor-pass";
  const isStudent = activeType === "student-pass";
  const isFounder = activeType === "founder-pass";
  const isDelegation = activeType === "delegation-pass";

  // Price & label lookup
  const getPassDetails = () => {
    switch (activeType) {
      case "student-pass":
        return {
          title: "Claim Your Student Pass",
          price: "₹99",
          amount: "₹99",
          badge: "Student & Researcher",
          btnColor: "btn-blue",
          accentColor: "#2563EB",
          btnBg: "linear-gradient(135deg, #2563EB, #1D4ED8)",
          btnGlow: "0 4px 16px rgba(37, 99, 235, 0.4)",
          btnIcon: QrCode,
          btnText: "Proceed to Real-Time UPI Scanner — ₹99",
          subtext: "Valid College / Student ID required at check-in counter."
        };
      case "founder-pass":
        return {
          title: "Apply for Founder VIP Pass",
          price: "₹499",
          amount: "₹499",
          badge: "Founder & CXO Circle",
          btnColor: "btn-violet",
          accentColor: "#7C3AED",
          btnBg: "linear-gradient(135deg, #7C3AED, #6D28D9)",
          btnGlow: "0 4px 16px rgba(124, 58, 237, 0.4)",
          btnIcon: QrCode,
          btnText: "Proceed to Real-Time UPI Scanner — ₹499",
          subtext: "Chatham House rules. Zero vanity metrics. Authentic peer network."
        };
      case "delegation-pass": {
        const total = delegationMembers === 1 ? 250 : delegationMembers * 200;
        return {
          title: "Get Corporate Delegation Pass",
          price: `₹${total}`,
          amount: `₹${total}`,
          badge: "Corporate Delegate",
          btnColor: "btn-pink",
          accentColor: "#EC4899",
          btnBg: "linear-gradient(135deg, #EC4899, #DB2777)",
          btnGlow: "0 4px 16px rgba(236, 72, 153, 0.4)",
          btnIcon: QrCode,
          btnText: `Proceed to Real-Time UPI Scanner — ₹${total} (${delegationMembers} ${delegationMembers === 1 ? "Attendee" : "Attendees"})`,
          subtext: delegationMembers === 1
            ? "₹250 for 1 member • Register 2+ members to unlock ₹200/member group rate!"
            : ` Group Rate Applied: ₹200 per member (${delegationMembers} attendees = ₹${total}, save ₹${delegationMembers * 50}!)`
        };
      }
      default:
        return {
          title: "Claim Your Free Visitor Pass",
          price: "FREE",
          amount: "FREE",
          badge: "Community Visitor",
          btnColor: "btn-teal",
          accentColor: "#00A699",
          btnBg: "linear-gradient(135deg, #00A699, #0D9488)",
          btnGlow: "0 4px 16px rgba(0, 166, 153, 0.4)",
          btnIcon: Ticket,
          btnText: "Claim Free Visitor Pass (₹0)",
          subtext: "100% Free with instant digital QR pass generation."
        };
    }
  };

  const currentDetails = getPassDetails();

  if (!passModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      showToast(" Please provide Full Name, Email Address, and Contact Number.");
      return;
    }

    // For Visitor Pass: Instant Free Registration (No payment required)
    if (isVisitor) {
      setIsProcessing(true);
      setTimeout(() => {
        registerPass({
          attendeeName: name,
          email,
          phone,
          contact: phone,
          passType: "visitor-pass",
          amount: "FREE",
          organization,
          role,
          notes
        });
        setIsProcessing(false);
        setPassModalOpen(false);
        // Smoothly jump down to the generated ticket
        const ticketEl = document.getElementById("digital-pass");
        if (ticketEl) {
          ticketEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return;
    }

    // For Remaining Paid Passes: Switch to Real-Time Payment Scanner step
    setModalView("scanner");
  };

  const handleScannerPaymentSuccess = (paymentReceipt) => {
    registerPass({
      attendeeName: isDelegation ? `${name} (${delegationMembers} Attendees)` : name,
      email,
      phone,
      contact: phone,
      passType: activeType,
      amount: currentDetails.amount,
      organization,
      role: isStudent ? `${role} (${additionalField || "Student"})` : role,
      notes: `Settled via Real-Time UPI Gateway (Ref: ${paymentReceipt.utrNumber}, Order: ${paymentReceipt.orderId}). ${notes}`
    });

    setPassModalOpen(false);
    // Smoothly jump down to the generated ticket
    setTimeout(() => {
      const ticketEl = document.getElementById("digital-pass");
      if (ticketEl) {
        ticketEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={() => setPassModalOpen(false)}>
      <div className="modal-content-card modal-pass-card-wide" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={() => setPassModalOpen(false)}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: "22px" }}>
          <span style={{ 
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: isVisitor ? "#E6FFFA" : (isStudent ? "#EFF6FF" : (isFounder ? "#F5F3FF" : "#FDF2F8")),
            border: `1.5px solid ${isVisitor ? "#99F6E4" : (isStudent ? "#BFDBFE" : (isFounder ? "#DDD6FE" : "#FBCFE8"))}`,
            color: currentDetails.accentColor,
            fontSize: "0.72rem",
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: "9999px",
            letterSpacing: "0.05em"
          }}>
            ACCREDITATION PORTAL
          </span>
          <h3 style={{ fontSize: "1.65rem", fontWeight: 850, marginTop: "8px", color: "#000000" }}>
            {modalView === "scanner" ? "UPI Scanner for Pass Accreditation" : currentDetails.title}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#4B5563", marginTop: "4px" }}>
            {modalView === "scanner" 
              ? "Scan the UPI QR code using GPay, PhonePe, Paytm, or BHIM for pass verification and instant issuance."
              : "Instant digital credentials issued with cryptographic QR verification."}
          </p>
        </div>

        {/* If in Real-Time Payment Scanner View */}
        {modalView === "scanner" ? (
          <RealTimePaymentScanner 
            passData={{
              passType: activeType === "student-pass" ? "Student Pass" : (activeType === "founder-pass" ? "Founder VIP Pass" : (activeType === "delegation-pass" ? "Corporate Delegation Pass" : "TechTalk Pass")),
              amount: currentDetails.amount,
              attendeeName: isDelegation ? `${name} (${delegationMembers} Attendees)` : name,
              email: email,
              phone: phone,
              organization: organization,
              role: role,
              passId: `TT26-${Math.floor(100000 + Math.random() * 900000)}`
            }}
            onPaymentSuccess={handleScannerPaymentSuccess}
            onCancel={() => setModalView("form")}
          />
        ) : (
          <>
            {/* 4 Separate Passes Selector Tabs */}
            <div className="pass-modal-tabs-strip" role="tablist">
          <button
            type="button"
            className={`pass-modal-tab ${isVisitor ? "active visitor" : ""}`}
            onClick={() => setSelectedPassType("visitor-pass")}
            role="tab"
            aria-selected={isVisitor}
          >
            <div className="tab-pill-icon"><Ticket size={14} /></div>
            <div className="tab-pill-info">
              <span className="tab-pill-name">Visitor Pass</span>
              <span className="tab-pill-price">FREE</span>
            </div>
          </button>

          <button
            type="button"
            className={`pass-modal-tab ${isStudent ? "active student" : ""}`}
            onClick={() => setSelectedPassType("student-pass")}
            role="tab"
            aria-selected={isStudent}
          >
            <div className="tab-pill-icon"><GraduationCap size={14} /></div>
            <div className="tab-pill-info">
              <span className="tab-pill-name">Student Pass</span>
              <span className="tab-pill-price">₹99</span>
            </div>
          </button>

          <button
            type="button"
            className={`pass-modal-tab ${isFounder ? "active founder" : ""}`}
            onClick={() => setSelectedPassType("founder-pass")}
            role="tab"
            aria-selected={isFounder}
          >
            <div className="tab-pill-icon"><Briefcase size={14} /></div>
            <div className="tab-pill-info">
              <span className="tab-pill-name">Founder Pass</span>
              <span className="tab-pill-price">₹499</span>
            </div>
          </button>

          <button
            type="button"
            className={`pass-modal-tab ${isDelegation ? "active delegate" : ""}`}
            onClick={() => setSelectedPassType("delegation-pass")}
            role="tab"
            aria-selected={isDelegation}
          >
            <div className="tab-pill-icon"><Building size={14} /></div>
            <div className="tab-pill-info">
              <span className="tab-pill-name">Delegation Pass</span>
              <span className="tab-pill-price">from ₹200</span>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-field-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                required
                className="form-input" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Email Address *</label>
              <input 
                type="email" 
                required
                className="form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="form-field-group">
            <label className="form-label">Contact Number *</label>
            <input 
              type="tel" 
              required
              className="form-input" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit mobile number"
            />
          </div>

          {/* Dynamic Context Fields based on Pass Type */}
          {isStudent && (
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
              <div className="form-field-group">
                <label className="form-label">College / University Name *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  value={organization} 
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="University or college name"
                />
              </div>
              <div className="form-field-group">
                <label className="form-label">Degree &amp; Graduation Year *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Degree and year of graduation"
                />
              </div>
            </div>
          )}

          {isFounder && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                <div className="form-field-group">
                  <label className="form-label">Startup / Company Name *</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={organization} 
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Startup or company name"
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-label">Role in Startup *</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role or designation"
                  />
                </div>
              </div>
              <div className="form-field-group">
                <label className="form-label">Funding &amp; Venture Stage</label>
                <select 
                  className="form-input"
                  value={additionalField}
                  onChange={(e) => setAdditionalField(e.target.value)}
                >
                  <option value="">Select Stage...</option>
                  <option value="Bootstrapped / Revenue-funded">Bootstrapped / Revenue-funded</option>
                  <option value="Pre-Seed (Building MVP)">Pre-Seed (Building MVP)</option>
                  <option value="Seed Stage ($200K - $1M)">Seed Stage ($200K - $1M)</option>
                  <option value="Growth / Series A+">Growth / Series A+</option>
                  <option value="Ideation / Early Concept">Ideation / Early Concept</option>
                </select>
              </div>
            </>
          )}

          {isDelegation && (
            <>
              {/* Member Selection / Dynamic Roster Counter for Delegation Pass */}
              <div style={{
                background: "#FDF2F8",
                border: "1.5px solid #FBCFE8",
                borderRadius: "14px",
                padding: "16px",
                marginBottom: "16px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <strong style={{ fontSize: "0.92rem", color: "#000000", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>Delegation Attendees</span>
                      <span style={{ 
                        fontSize: "0.725rem", 
                        padding: "3px 9px", 
                        borderRadius: "12px", 
                        background: delegationMembers >= 2 ? "#EC4899" : "#F1F5F9",
                        color: delegationMembers >= 2 ? "#FFFFFF" : "#64748B",
                        fontWeight: 800 
                      }}>
                        {delegationMembers >= 2 ? "Group Rate: ₹200 / member" : "Single: ₹250"}
                      </span>
                    </strong>
                    <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#4B5563" }}>
                      {delegationMembers === 1 
                        ? "1 Member = ₹250. Add 2+ members to unlock the ₹200 per member group discount!" 
                        : ` Group Discount Applied: ₹200 × ${delegationMembers} members = ₹${delegationMembers * 200} (You save ₹${delegationMembers * 50})`}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      type="button"
                      style={{ width: "32px", height: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", fontWeight: 800, fontSize: "1rem", background: "#FFFFFF", border: "1.5px solid #E2E8F0", color: "#000000", cursor: delegationMembers <= 1 ? "not-allowed" : "pointer" }}
                      onClick={() => setDelegationMembers(Math.max(1, delegationMembers - 1))}
                      disabled={delegationMembers <= 1}
                      title="Decrease member count"
                    >
                      -
                    </button>

                    <span style={{ minWidth: "32px", textAlign: "center", fontWeight: 850, fontSize: "1.15rem", color: "#EC4899" }}>
                      {delegationMembers}
                    </span>

                    <button
                      type="button"
                      style={{ width: "32px", height: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", fontWeight: 800, fontSize: "1rem", background: "#FFFFFF", border: "1.5px solid #E2E8F0", color: "#000000", cursor: "pointer" }}
                      onClick={() => setDelegationMembers(Math.min(25, delegationMembers + 1))}
                      title="Add another member"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quick Presets */}
                <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "10px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Quick presets:</span>
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setDelegationMembers(num)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: delegationMembers === num ? "#EC4899" : "#FFFFFF",
                        color: delegationMembers === num ? "#FFFFFF" : "#475569",
                        border: "1.5px solid",
                        borderColor: delegationMembers === num ? "#EC4899" : "#E2E8F0",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {num} {num === 1 ? "member (₹250)" : `members (₹${num * 200})`}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                <div className="form-field-group">
                  <label className="form-label">Corporate Enterprise / Firm *</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={organization} 
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Organization or enterprise name"
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-label">Lead Delegate Role *</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role or designation"
                  />
                </div>
              </div>
            </>
          )}

          {isVisitor && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-field-group">
                <label className="form-label">Affiliation / College (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={organization} 
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Organization or institution"
                />
              </div>
              <div className="form-field-group">
                <label className="form-label">Current Role / Interest</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role or focus area"
                />
              </div>
            </div>
          )}

          {(isFounder || isDelegation) && (
            <div className="form-field-group">
              <label className="form-label">
                {isFounder ? "What are you looking for from the Founder Circle?" : "Delegation Focus / Objectives"}
              </label>
              <textarea 
                className="form-input" 
                rows="2"
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isFounder ? "Provide your startup objectives, collaboration interests, or questions..." : "Provide delegation objectives, technical areas of focus, or requirements..."}
              />
            </div>
          )}

          {/* Pricing & Accreditation Summary Box */}
          <div style={{
            background: "#F8FAFC",
            padding: "16px 18px",
            borderRadius: "14px",
            border: "1.5px solid #E2E8F0",
            marginTop: "14px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
              <span style={{ color: "#64748B", fontWeight: 650 }}>Pass Category</span>
              <span style={{ fontWeight: 800, color: currentDetails.accentColor }}>{currentDetails.badge}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: currentDetails.accentColor }}>
                  {currentDetails.amount === "FREE" ? "FREE (₹0)" : currentDetails.amount}
                </div>
                <div style={{ fontSize: "0.775rem", color: "#4B5563", marginTop: "2px" }}>
                  {currentDetails.subtext}
                </div>
              </div>
              <div style={{
                fontSize: "0.75rem",
                padding: "6px 12px",
                borderRadius: "9999px",
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                fontWeight: 750,
                color: "#0F172A",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
              }}>
                <QrCode size={13} color={currentDetails.accentColor} />
                <span>Instant Digital QR Pass</span>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              width: "100%", 
              padding: "14px 20px",
              background: currentDetails.btnBg,
              color: "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: currentDetails.btnGlow,
              transition: "all 0.2s ease"
            }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span>Generating Verified Pass...</span>
            ) : (
              <>
                <currentDetails.btnIcon size={17} />
                <span>{currentDetails.btnText}</span>
              </>
            )}
          </button>

          {!isVisitor && (
            <button
              type="button"
              style={{
                width: "100%",
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.875rem",
                padding: "12px 16px",
                background: "#F1F5F9",
                border: "1.5px solid #CBD5E1",
                color: "#0F172A",
                borderRadius: "12px",
                fontWeight: 750,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onClick={() => {
                setPassModalOpen(false);
                const queryStr = isDelegation 
                  ? `/checkout?pass=${activeType}&members=${delegationMembers}`
                  : `/checkout?pass=${activeType}`;
                navigate(queryStr);
              }}
            >
              <Landmark size={15} color="#2563EB" />
              <span>Proceed to Indian Banking / UPI Checkout Page</span>
            </button>
          )}
        </form>
        </>
      )}
      </div>
    </div>
  );
}

