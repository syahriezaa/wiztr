"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogItem } from "@/lib/catalog";

const CATEGORIES = ["T-Shirt", "Hoodie", "Jaket", "Celana", "Aksesoris", "Lainnya"];

function ItemModal({
  item,
  onClose,
  onSave,
}: {
  item: Partial<CatalogItem> | null;
  onClose: () => void;
  onSave: (data: Partial<CatalogItem>) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<CatalogItem>>(
    item ?? { name: "", description: "", category: "T-Shirt", image: "", available: true }
  );
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    let finalImageUrl = form.image;
    
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        } else {
          alert("Gagal mengunggah gambar produk.");
          setSaving(false);
          return;
        }
      } catch (err) {
        alert("Terjadi kesalahan saat mengunggah gambar.");
        setSaving(false);
        return;
      }
    }

    await onSave({ ...form, image: finalImageUrl });
    setSaving(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item?.id ? "Edit Item" : "Tambah Item Baru"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="admin-input-group">
            <label htmlFor="modal-name">Nama Produk *</label>
            <input id="modal-name" name="name" value={form.name ?? ""} onChange={handleChange} required placeholder="Contoh: WIZTR Classic Tee" />
          </div>
          <div className="admin-input-group">
            <label htmlFor="modal-category">Kategori *</label>
            <select id="modal-category" name="category" value={form.category ?? "T-Shirt"} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="admin-input-group">
            <label htmlFor="modal-description">Deskripsi</label>
            <textarea id="modal-description" name="description" value={form.description ?? ""} onChange={handleChange} rows={3} placeholder="Deskripsi singkat produk..." />
          </div>
          <div className="admin-input-group">
            <label htmlFor="modal-image">Gambar Produk</label>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
              {(form.image || selectedFile) && (
                <div style={{width: 48, height: 48, borderRadius: 6, overflow: 'hidden', background: 'rgba(255,255,255,0.1)'}}>
                   {selectedFile ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                   ) : form.image ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={form.image} alt="Preview" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                   ) : null}
                </div>
              )}
              <input id="modal-image" name="image" value={form.image ?? ""} onChange={handleChange} placeholder="Atau ketik URL secara manual..." style={{flex: 1}} />
            </div>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="rounded border border-white/20 bg-black/40 p-2 text-sm text-white focus:border-[var(--wiztr-red)] focus:outline-none"
            />
          </div>
          <div className="admin-checkbox-group">
            <input id="modal-available" name="available" type="checkbox" checked={form.available ?? true} onChange={handleChange} />
            <label htmlFor="modal-available">Tampilkan di katalog publik</label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" id="btn-save-item" className="btn-primary" disabled={saving}>
              {saving ? <span className="admin-spinner" /> : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<Partial<CatalogItem> | null | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"catalog" | "settings">("catalog");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState({ mainBannerUrl: "", mainBackgroundUrl: "", waAdmin1: "", waAdmin2: "" });
  const [savingSettings, setSavingSettings] = useState(false);
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);
  const [selectedBgFile, setSelectedBgFile] = useState<File | null>(null);

  async function fetchItemsAndSettings() {
    try {
      const [itemsRes, settingsRes] = await Promise.all([
        fetch("/api/admin/items"),
        fetch("/api/admin/settings")
      ]);
      
      if (itemsRes.status === 401 || settingsRes.status === 401) {
        router.push("/admin/login");
        return;
      }
      
      const [itemsData, settingsData] = await Promise.all([
        itemsRes.json(),
        settingsRes.json()
      ]);
      
      setItems(itemsData);
      setSettings(settingsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItemsAndSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function handleSave(data: Partial<CatalogItem>) {
    if (data.id) {
      await fetch(`/api/admin/items/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/admin/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setModalItem(undefined);
    fetchItemsAndSettings();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/items/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchItemsAndSettings();
  }

  async function toggleAvailable(item: CatalogItem) {
    await fetch(`/api/admin/items/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !item.available }),
    });
    fetchItemsAndSettings();
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSavingSettings(true);

    let finalBannerUrl = settings.mainBannerUrl;
    let finalBgUrl = settings.mainBackgroundUrl;

    // Upload Banner
    if (selectedBannerFile) {
      const formData = new FormData();
      formData.append("file", selectedBannerFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        finalBannerUrl = uploadData.url;
      } else {
        alert("Gagal mengunggah Banner. Pastikan format didukung dan coba lagi.");
        setSavingSettings(false);
        return;
      }
    }

    // Upload Background
    if (selectedBgFile) {
      const formData = new FormData();
      formData.append("file", selectedBgFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        finalBgUrl = uploadData.url;
      } else {
        alert("Gagal mengunggah Background. Pastikan format didukung dan coba lagi.");
        setSavingSettings(false);
        return;
      }
    }

    const newSettings = { 
      ...settings, 
      mainBannerUrl: finalBannerUrl, 
      mainBackgroundUrl: finalBgUrl 
    };

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings),
    });

    setSettings(newSettings);
    setSelectedBannerFile(null);
    setSelectedBgFile(null);
    setSavingSettings(false);
  }

  return (
    <div className="admin-page">
      {/* Mobile top bar */}
      <div className="admin-mobile-topbar">
        <span className="admin-mobile-topbar-brand">WIZTR</span>
        <button className="admin-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Sidebar overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "sidebar-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-sidebar-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/WIZTR text.svg" alt="WIZTR" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span>WIZTR</span>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(245,241,235,0.4)", cursor: "pointer", lineHeight: 1 }}
            className="md:hidden"
          >
            ✕
          </button>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "catalog" ? "active" : ""}`}
            onClick={() => { setActiveTab("catalog"); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            Katalog
          </button>
          <button
            className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => { setActiveTab("settings"); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Pengaturan
          </button>
          <a href="/catalog" target="_blank" className="admin-nav-item" onClick={() => setSidebarOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            Lihat Katalog
          </a>
        </nav>
        <button id="btn-logout" className="admin-logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {activeTab === "catalog" && (
          <>
            <div className="admin-topbar">
              <div>
                <h1>Manajemen Katalog</h1>
                <p>{items.length} item terdaftar · {items.filter((i) => i.available).length} ditampilkan</p>
              </div>
              <button
                id="btn-add-item"
                className="btn-primary"
                onClick={() => setModalItem(null)}
              >
                + Tambah Item
              </button>
            </div>

        {loading ? (
          <div className="admin-loading">
            <span className="admin-spinner admin-spinner-lg" />
          </div>
        ) : items.length === 0 ? (
          <div className="admin-empty">
            <p>Belum ada item di katalog.</p>
            <button className="btn-primary" onClick={() => setModalItem(null)}>Tambah Item Pertama</button>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-item-cell">
                        <div className="admin-item-thumb">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image} alt={item.name} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          ) : (
                            <div className="admin-item-thumb-placeholder" />
                          )}
                        </div>
                        <div>
                          <div className="admin-item-name">{item.name}</div>
                          <div className="admin-item-desc">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="catalog-badge">{item.category}</span></td>
                    <td>
                      <button
                        className={`admin-toggle ${item.available ? "admin-toggle-on" : "admin-toggle-off"}`}
                        onClick={() => toggleAvailable(item)}
                        title={item.available ? "Sembunyikan dari katalog" : "Tampilkan di katalog"}
                      >
                        {item.available ? "Aktif" : "Tersembunyi"}
                      </button>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => setModalItem(item)}
                          title="Edit"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => setDeleteId(item.id)}
                          title="Hapus"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <div className="admin-topbar">
              <div>
                <h1>Pengaturan Website</h1>
                <p>Ubah konfigurasi umum landing page</p>
              </div>
            </div>
            
            {loading ? (
              <div className="admin-loading">
                <span className="admin-spinner admin-spinner-lg" />
              </div>
            ) : (
              <div className="rounded-[12px] border border-[rgba(245,241,235,0.07)] bg-[#111] p-6">
                <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
                  <div className="admin-input-group">
                    <label htmlFor="mainBannerUrl">Gambar Banner Utama (Depan)</label>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem'}}>
                      {settings.mainBannerUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.mainBannerUrl} alt="Preview" style={{height: 60, borderRadius: 8, background: 'rgba(255,255,255,0.1)', objectFit: 'contain'}} />
                      ) : null}
                      <input 
                        id="mainBannerUrl" 
                        name="mainBannerUrl" 
                        value={settings.mainBannerUrl} 
                        onChange={(e) => setSettings({ ...settings, mainBannerUrl: e.target.value })} 
                        placeholder="Atau ketik URL secara manual..." 
                        style={{flex: 1}}
                      />
                    </div>
                    
                    <input 
                      type="file" 
                      id="bannerFile" 
                      accept="image/svg+xml,image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedBannerFile(e.target.files[0]);
                        }
                      }}
                      className="rounded border border-white/20 bg-black/40 p-2 text-sm text-white focus:border-[var(--wiztr-red)] focus:outline-none"
                    />
                    <p className="text-xs text-[rgba(245,241,235,0.4)] mt-1">
                      {selectedBannerFile 
                        ? `File siap diupload: ${selectedBannerFile.name}` 
                        : "Upload gambar banner utama (disarankan format SVG dengan background transparan)."}
                    </p>
                  </div>

                  <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0'}} />

                  <div className="admin-input-group">
                    <label htmlFor="mainBackgroundUrl">Gambar Background (Belakang)</label>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem'}}>
                      {settings.mainBackgroundUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.mainBackgroundUrl} alt="Preview Background" style={{height: 60, borderRadius: 8, background: 'rgba(255,255,255,0.1)', objectFit: 'cover'}} />
                      ) : null}
                      <input 
                        id="mainBackgroundUrl" 
                        name="mainBackgroundUrl" 
                        value={settings.mainBackgroundUrl} 
                        onChange={(e) => setSettings({ ...settings, mainBackgroundUrl: e.target.value })} 
                        placeholder="Atau ketik URL secara manual..." 
                        style={{flex: 1}}
                      />
                    </div>
                    
                    <input 
                      type="file" 
                      id="bgFile" 
                      accept="image/svg+xml,image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedBgFile(e.target.files[0]);
                        }
                      }}
                      className="rounded border border-white/20 bg-black/40 p-2 text-sm text-white focus:border-[var(--wiztr-red)] focus:outline-none"
                    />
                    <p className="text-xs text-[rgba(245,241,235,0.4)] mt-1">
                      {selectedBgFile 
                        ? `File siap diupload: ${selectedBgFile.name}` 
                        : "Upload gambar latar belakang (background) untuk halaman utama."}
                    </p>
                  </div>
                  
                  <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0'}} />

                  <div className="admin-input-group">
                    <label htmlFor="waAdmin1">Nomor WhatsApp Admin 1</label>
                    <input
                      id="waAdmin1"
                      name="waAdmin1"
                      value={settings.waAdmin1}
                      onChange={(e) => setSettings({ ...settings, waAdmin1: e.target.value })}
                      placeholder="Contoh: 628980025000 (tanpa +)"
                    />
                    <p className="text-xs text-[rgba(245,241,235,0.4)] mt-1">Format: kode negara + nomor, tanpa tanda + atau spasi.</p>
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="waAdmin2">Nomor WhatsApp Admin 2</label>
                    <input
                      id="waAdmin2"
                      name="waAdmin2"
                      value={settings.waAdmin2}
                      onChange={(e) => setSettings({ ...settings, waAdmin2: e.target.value })}
                      placeholder="Contoh: 6289601205232 (tanpa +)"
                    />
                    <p className="text-xs text-[rgba(245,241,235,0.4)] mt-1">Digunakan untuk tombol Order di halaman Pre-Order.</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button type="submit" className="btn-primary" disabled={savingSettings}>
                      {savingSettings ? <span className="admin-spinner" /> : "Simpan Pengaturan"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal tambah/edit */}
      {modalItem !== undefined && (
        <ItemModal
          item={modalItem}
          onClose={() => setModalItem(undefined)}
          onSave={handleSave}
        />
      )}

      {/* Konfirmasi hapus */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-card modal-confirm" onClick={(e) => e.stopPropagation()}>
            <h2>Hapus Item?</h2>
            <p>Tindakan ini tidak bisa dibatalkan.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Batal</button>
              <button id="btn-confirm-delete" className="btn-danger" onClick={() => handleDelete(deleteId)}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
