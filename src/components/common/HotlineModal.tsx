import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_HOTLINES } from '../../lib/constants';
import { Modal } from './Modal';
import { Phone, Search, AlertCircle, Check, Copy } from 'lucide-react';
import { Badge } from './Badge';
import { useToast } from '../../context/ToastContext';
import { triggerHaptic } from '../../lib/haptics';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const filteredHotlines = INITIAL_HOTLINES.filter((entry) => {
    const term = searchTerm.toLowerCase();
    return (
      entry.municipality.toLowerCase().includes(term) ||
      entry.office_name_en.toLowerCase().includes(term) ||
      entry.office_name_ceb.toLowerCase().includes(term) ||
      entry.phone_numbers.some((num) => num.includes(term))
    );
  });

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    showToast(t(`Copied ${number} to clipboard!`, `Nahi-kopya ang ${number}!`), 'success');
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
            <Phone className="w-4 h-4" />
          </div>
          <span>{t('District 3 Emergency Hotlines & Directory', 'Mga Hotline sa Emerhensiya sa Distrito 3')}</span>
        </div>
      }
      subtitle={t(
        'Direct numbers for PTV Patient Transport, Clinic Desk, and Municipal MDRRMOs',
        'Diretsong mga numero alang sa PTV, Klinika, ug Munisipyo'
      )}
    >
      <div className="space-y-4">
        {/* Search Landmark & Input */}
        <search className="relative">
          <label htmlFor="hotline-search-input" className="sr-only">
            {t('Search directory hotlines by town', 'Pangitaa ang mga hotline')}
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            id="hotline-search-input"
            name="q"
            type="search"
            placeholder={t('Search by town (e.g. Carmen, Jagna, PTV)...', 'Pangitaa pinaagi sa lungsod (e.g. Carmen, Jagna, PTV)...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
        </search>

        {/* Priority Banner for PTV Dispatch */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 animate-pulse text-amber-200" />
            <div>
              <div className="text-xs font-black uppercase tracking-wider">
                {t('PTV 24/7 Patient Emergency Hotline', 'PTV 24/7 Hotline sa Pasyente')}
              </div>
              <div className="text-sm font-extrabold">+63 917 832 6284</div>
            </div>
          </div>
          <a
            href="tel:+639178326284"
            className="px-3.5 py-1.5 rounded-xl bg-white text-red-700 text-xs font-black shadow hover:bg-red-50 transition-colors"
          >
            {t('Call Now', 'Tawag Na')}
          </a>
        </div>

        {/* Hotlines List */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {filteredHotlines.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-orange-100 bg-white hover:border-orange-300 transition-colors shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={item.is_emergency ? 'red' : 'orange'} size="sm">
                    {item.municipality}
                  </Badge>
                  {item.contact_person && (
                    <span className="text-[11px] text-slate-500 font-medium">
                      &bull; {item.contact_person}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {t(item.office_name_en, item.office_name_ceb)}
                </h4>
              </div>

              {/* Numbers with Dial and Copy Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {item.phone_numbers.map((phoneNum, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                    <a
                      href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
                      onClick={() => triggerHaptic('emergency')}
                      className="text-xs font-bold text-slate-800 hover:text-orange-600 transition-colors"
                      title={t('Click to call', 'Pindota aron motawag')}
                    >
                      {phoneNum}
                    </a>
                    <button
                      onClick={() => handleCopy(phoneNum)}
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors ml-1"
                      title="Copy number"
                    >
                      {copiedNumber === phoneNum ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredHotlines.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              {t('No directory numbers found matching your query.', 'Walay nakit-an nga numero sumala sa imong gipangita.')}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HotlineModal;
