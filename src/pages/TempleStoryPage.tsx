import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { useNavigation } from '../context/NavigationContext';
import { BookOpen, Sparkles, Droplets, Mountain, ArrowRight } from 'lucide-react';
import { BrahmagiriIcon } from '../components/Motifs';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/seoData';

export function TempleStoryPage() {
  const { navigate, openBooking } = useNavigation();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Temple', path: '/temple' },
    { name: 'Sacred Story & Lore', path: '/temple/story' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="Legend of Sage Gautama & River Godavari Origin | Trimbakeshwar Puranic Story"
        description="Read the sacred Shiva Purana narrative of Sage Gautama penance on Brahmagiri mountain, Lord Shiva releasing Ganga as River Gautami (Godavari), and manifest Jyotirlinga."
        canonicalPath="/temple/story"
        keywords={[
          'Trimbakeshwar story',
          'Sage Gautama tapasya',
          'Godavari origin legend',
          'Gautami Ganga descent',
          'Brahmagiri mountain history',
        ]}
        schema={breadcrumbsSchema}
      />
      <InnerPageHero
        breadcrumbs={[
          { label: 'Temple', route: '/temple' },
          { label: 'Sacred Story' },
        ]}
        sanskritMantra="॥ श्री गोदावरी माहात्म्यम् ॥"
        title="The Sacred Puranic Legend of Trimbakeshwar"
        nativeTitle="त्र्यंबकेश्वर व गंगा गोदावरी अवतरण कथा"
        description="The timeless tale of Sage Gautama severe tapasya on Brahmagiri, the redemption from Govatya, and Lord Shiva releasing the holy Godavari from his matted locks."
        bgImage="/assets/trimbak/brahmagiri-parvat.webp"
        ctaText="Visit Sacred Places"
        onCtaClick={() => navigate('/sacred-places')}
        ctaIcon={<BrahmagiriIcon className="w-4 h-4 text-white" />}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-10 sm:space-y-14">
        {/* Story Part 1: The Great Drought in Dandakaranya */}
        <section className="bg-white/85 border border-[#B88935]/25 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C56A18] uppercase tracking-wider">
            <Mountain className="w-4 h-4" />
            <span>Chapter I: The Drought & Sage Gautama Tapasya</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
            The Holy Hermitage in Dandakaranya
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            In the Treta Yuga, a severe drought lasting twenty-four continuous years struck the sacred forests of Dandakaranya. 
            All wells, ponds, and rivers evaporated; birds and beasts perished, and trees withered away. However, on the slopes of 
            Mount Brahmagiri, the revered Sage Gautama and his chaste consort Mata Ahilya lived in deep penance.
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Pleased with Gautama Rishi selfless devotion, Lord Varuna (the God of Waters) granted him an inexhaustible pit that 
            yielded bountiful fresh water every morning. The sage sowed barley, rice, and grains, feeding thousands of starving 
            sadhus, hermits, and forest animals who sought refuge in his ashram.
          </p>
        </section>

        {/* Story Part 2: The Jealousy of Rishis & The Cow of Illusion */}
        <section className="bg-white/85 border border-[#B88935]/25 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C56A18] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Chapter II: The Illusionary Cow (Maya Dhenu)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
            The Test of Sage Gautama Patience
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Witnessing Sage Gautama growing fame and spiritual luster, certain rival ascetics were consumed by envy. Through 
            incantations to Lord Ganesha, they created an emaciated, fragile magical cow (Maya Dhenu) and sent it to graze upon 
            Gautama ripest paddy crop.
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            When Sage Gautama gently touched the cow with a blade of Darbha grass to steer it away from the grain, the cow 
            instantaneously fell dead onto the earth. The rival ascetics loudly cried "Govatya!" (the sin of cow-killing) and expelled 
            Gautama and Ahilya from the hermitage, forbidding them from performing sacred Vedic sacrifices until the sin was purified.
          </p>
        </section>

        {/* Story Part 3: Severe Penance & Shiva's Descent */}
        <section className="bg-white/85 border border-[#B88935]/25 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C56A18] uppercase tracking-wider">
            <Droplets className="w-4 h-4" />
            <span>Chapter III: Descent of Gautami Godavari</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
            Lord Shiva Tandava & The Gift of River Godavari
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Heartbroken, Sage Gautama ascended to the highest peak of Mount Brahmagiri. He installed a Parthiva Shivalinga and 
            engaged in rigorous penance, standing on one leg for a thousand years without food or water.
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Deeply moved, Lord Shiva manifested before him in his resplendent form accompanied by Parvati. Mahadev revealed that 
            the cow incident was a malevolent conspiracy by envious rishis and that Gautama was completely sinless. Nevertheless, 
            to grant salvation to all beings in South India, Gautama requested Lord Shiva to release the sacred celestial Ganga from 
            his matted tresses onto Brahmagiri.
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Lord Shiva struck his Jata onto the stones of Brahmagiri, and the holy river descended with deafening majesty. 
            Because she descended for Gautama, she is revered as <strong>Gautami Ganga</strong> or <strong>River Godavari</strong>.
          </p>
        </section>

        {/* Story Part 4: Kushavarta Tirtha Enclosure */}
        <section className="bg-[#EDE3D1]/50 border border-[#B88935]/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C56A18] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Chapter IV: The Kushavarta Enclosure & Manifestation of Jyotirlinga</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
            Capturing the River in a Circle of Kusha Grass
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Whenever Sage Gautama stepped forward to bathe in the swift mountain torrent, the celestial river playfully disappeared 
            under the boulders. Understanding her nature, the sage encircled a patch of earth with consecrated Kusha grass rings 
            and took a solemn vow (Sankalp). Bound by the sanctity of Kusha, the river stayed permanently within the circle—thus 
            forming the world-famous <strong>Kushavarta Kund</strong>.
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            At the prayers of Sage Gautama, Brahma, and Vishnu, Lord Shiva consented to reside permanently at the site together with 
            the Trinity. Thus, the three-faced <strong>Trimbakeshwar Jyotirlinga</strong> manifested to grant liberation and ancestral 
            peace for all eternity.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/jyotirlinga')}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-sm transition-all"
            >
              Explore The Jyotirlinga →
            </button>
            <button
              onClick={() => navigate('/sacred-places')}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-[#5A1717] bg-white border border-[#B88935]/30 hover:bg-[#EDE3D1] transition-colors"
            >
              View Kushavarta & Brahmagiri
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
