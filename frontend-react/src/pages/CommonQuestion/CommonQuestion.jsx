import React from "react";
import { images } from "../../constants";
import { Button } from "../../components";
import { CqButton } from "../../components/CqButton/CqButton.jsx";

import "./CommonQuestion.scss";

export const CommonQuestion = () => {
  return (
    <div className="common-question">
      <div style={{ position: "relative" }}>
        <img src={images.CQ} alt="cq" />
        <h1 className="black-color cq-title ">الاسئلة الشائعة</h1>
      </div>

      <div className="container cq-container">
        <div className="row">
          <div className="f-main-col">
            <div className="f-col-row-header">
              <h1 className="white-color">عايز تشتري عربية من ...</h1>
              <p className="white-color">
                كل الأسئلة عن الضمان، اختبارات القيادة، الحجوزات، أنظمة التقسيط،
                وغيرها.
              </p>
            </div>
            <CqButton
              title="ازاي اقدر أشوف العربية قبل ما اشتريها؟"
              answer="ممكن تشوف العربية أونلاين من خلال صور بانورامية 360 درجة عالية الجودة هتخليك تلف حوالين العربية وتعاين كل جزء فيها جوه وبره وتقييم حالتها قبل ما تشرتريها.

ممكن بردو تشوف العربية لو حجزت خدمة إختبار القيادة من تحت البيت. هتقدر تعاينها على الطبيعة، وتسوقها وتقيم تجربتك. في الحالة ديه هيبقي فيه من طرفنا خبير متخصص علشان يجاوب على كل أسئلتك ويساعدك تاخد القرار الصح"
            />
            <CqButton
              title="هل ممكن أتفاوض في سعر عربيات سيلندر؟"
              answer="سعر العربيات في سيلندر ثابت وغير قابل للتفاوض. إحنا مقتنعين بآن جميع عملائنا من حقهم الحصول على سعر ثابت طبقًا لحالة العربية بغض النظر عن مهارتهم التفاوضية أو حاجتهم للعربية، وأن من حق كل عميل لسيلندر أنه يحصل مباشرة على أفضل سعر للعربية!

              احنا بنحدد سعر كل عربية اعتمادا على بيانات أسعار السوق ونتائج تقرير الفحص اللى بنجريه علشان نوصل لسعر عادل. وده بيخلي العميل يشتري العربية اللى هو عايزها وهو مطمن بأن ده أفضل سعر مقابل القيمة، لإنها معتمدة من سيلندر."
            />
            <CqButton
              title="إيه هو شكل نقل الملكية؟"
              answer="بعد دفع تمن العربية، هنوفر لك جواب لإدارة المرور لنقل ملكية العربية باسمك. ولتسهيل الإجراءات عليك، إحنا مسجلين سيلندر في إدارة المرور كموزع معتمد للعربيات وده بيوفر عليك مشوار نقل الملكية في مكتب الشهر العقاري."
            />
            <CqButton
              title="ازاي أقدر أقدم على تمويل؟"
              answer="تقدر تقدم اونلاين على موقعنا بعد ما تحجز عربيتك. لدينا شراكات مع عدد من مؤسسات التمويل واللي بتوفر أكتر من نظام تمويل بصورة مرنة.

              قبل ما تقرر، هتقدر من خلال موقعنا تحدد المقدم اللى هتدفعه، ومدة النقسيط اللي تفضلها، وإذا كنت عايز إن العربية يكون عليها حظر بيع أو لأ، وببساطة هتعرف قيمة القسط الشهري اللى عليك. أول ما تخلص الإجراءات دي على الموقع، فريقنا هيدرس الملف مع مؤسسة التمويل، وهنتواصل معاك علشان نبلغك بتطور طلب التمويل."
            />
            <CqButton
              title="إيه هي سياسة سيلندر لاسترداد الأموال خلال 7 أيام؟"
              answer="ضمان  والشروط هي كالتالي:
              
"
            />
            <CqButton
              title="إيه هو ضمان ال٩٠ يوم من سيلندر؟"
              answer="ضمان ال٩٠ يوم من سيلندر
كل عربيات سيلندر المعتمدة مضمونة لمدة ٩٠ يوم علشان نوفر متعة قيادة العربية بدون أي أعطال ميكانيكية مفاجئة. الضمان بيكون لمدة 90 يوم أو 5000 كم (أيهما أقرب) من تاريخ شراء العربية.
"
            />
            <div className="row-btn">
              <Button
                className="show-all-cq-f-btn"
                value="تصفح جميع الأسئلة "
              />
            </div>
          </div>
          <div className="f-main-col s-main-col">
            <div className="f-col-row-header s-col-row-header">
              <h1 className="white-color">عايز تبيع عربية علي ...</h1>
              <p className="white-color">
                كل الأسئلة عن الضمان، اختبارات القيادة، الحجوزات، أنظمة التقسيط،
                وغيرها.
              </p>
            </div>
            <CqButton
              title="ازاي اقدر أشوف العربية قبل ما اشتريها؟"
              answer="ممكن تشوف العربية أونلاين من خلال صور بانورامية 360 درجة عالية الجودة هتخليك تلف حوالين العربية وتعاين كل جزء فيها جوه وبره وتقييم حالتها قبل ما تشرتريها.

ممكن بردو تشوف العربية لو حجزت خدمة إختبار القيادة من تحت البيت. هتقدر تعاينها على الطبيعة، وتسوقها وتقيم تجربتك. في الحالة ديه هيبقي فيه من طرفنا خبير متخصص علشان يجاوب على كل أسئلتك ويساعدك تاخد القرار الصح"
            />
            <CqButton
              title="هل ممكن أتفاوض في سعر عربيات سيلندر؟"
              answer="سعر العربيات في سيلندر ثابت وغير قابل للتفاوض. إحنا مقتنعين بآن جميع عملائنا من حقهم الحصول على سعر ثابت طبقًا لحالة العربية بغض النظر عن مهارتهم التفاوضية أو حاجتهم للعربية، وأن من حق كل عميل لسيلندر أنه يحصل مباشرة على أفضل سعر للعربية!

              احنا بنحدد سعر كل عربية اعتمادا على بيانات أسعار السوق ونتائج تقرير الفحص اللى بنجريه علشان نوصل لسعر عادل. وده بيخلي العميل يشتري العربية اللى هو عايزها وهو مطمن بأن ده أفضل سعر مقابل القيمة، لإنها معتمدة من سيلندر."
            />
            <CqButton
              title="إيه هو شكل نقل الملكية؟"
              answer="بعد دفع تمن العربية، هنوفر لك جواب لإدارة المرور لنقل ملكية العربية باسمك. ولتسهيل الإجراءات عليك، إحنا مسجلين سيلندر في إدارة المرور كموزع معتمد للعربيات وده بيوفر عليك مشوار نقل الملكية في مكتب الشهر العقاري."
            />
            <CqButton
              title="ازاي أقدر أقدم على تمويل؟"
              answer="تقدر تقدم اونلاين على موقعنا بعد ما تحجز عربيتك. لدينا شراكات مع عدد من مؤسسات التمويل واللي بتوفر أكتر من نظام تمويل بصورة مرنة.

              قبل ما تقرر، هتقدر من خلال موقعنا تحدد المقدم اللى هتدفعه، ومدة النقسيط اللي تفضلها، وإذا كنت عايز إن العربية يكون عليها حظر بيع أو لأ، وببساطة هتعرف قيمة القسط الشهري اللى عليك. أول ما تخلص الإجراءات دي على الموقع، فريقنا هيدرس الملف مع مؤسسة التمويل، وهنتواصل معاك علشان نبلغك بتطور طلب التمويل."
            />
            <CqButton
              title="إيه هي سياسة سيلندر لاسترداد الأموال خلال 7 أيام؟"
              answer="ضمان  والشروط هي كالتالي:
"
            />
            <CqButton
              title="إيه هو ضمان ال٩٠ يوم من سيلندر؟"
              answer="ضمان ال٩٠ يوم من سيلندر
كل عربيات سيلندر المعتمدة مضمونة لمدة ٩٠ يوم علشان نوفر متعة قيادة العربية بدون أي أعطال ميكانيكية مفاجئة. الضمان بيكون لمدة 90 يوم أو 5000 كم (أيهما أقرب) من تاريخ شراء العربية.
طلب ضمان سيلندر
"
            />
            <div className="row-btn">
              <Button
                className="show-all-cq-f-btn show-all-cq-s-btn"
                value="تصفح جميع الأسئلة "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
