import { useTranslation } from 'react-i18next';

const Legend = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 p-3 rounded-md shadow-sm mb-4">
      <div className="flex space-x-6 justify-center">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">{t('VIP ticket')}</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">{t('Regular ticket')}</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-pink-100 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">{t('Taken')}</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">{t('In Cart')}</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
