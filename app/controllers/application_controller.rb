class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :format_rating

  def format_rating(rating)
    grade_split = rating.split(" ")
    grade_match = /(5\.\d*)(.)(.*)/
    grade = grade_match.match(grade_split[0])
    return ["Other", rating] if grade.nil?
    case grade[2]
    when ""
      final_grade = grade[1]
    when "-"
      if grade[1].length == 4
        final_grade = grade[1] + "a"
      else
        final_grade = grade[1]
      end
    when "+"
      if grade[1].length == 4
        final_grade = grade[1] + "d"
      else
        final_grade = grade[1]
      end
    else
      final_grade = grade[1] + grade[2]
    end
    return [final_grade, grade_split[1]]
  end

end
